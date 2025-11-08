import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/components/Icons');

// Read all TypeScript files in the Icons directory
const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.tsx') && file !== 'index.ts' && file !== 'ICON_USAGE_EXAMPLE.tsx');

files.forEach(file => {
  const filePath = path.join(iconsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // First, fix any existing syntax errors from previous runs
  // Case 1: Pattern ); followed by }; in SVGR format (syntax error)
  // This happens when SVGR generates arrow function but script incorrectly added };
  // Check if it's SVGR format (arrow function with parentheses, no return statement)
  if (content.match(/\);\s*\n\s*\};/) && !content.match(/return\s*\(/)) {
    // Remove the extra }; after ); - this is SVGR format that hasn't been converted yet
    content = content.replace(/\);\s*\n\s*\};/g, ');');
    console.log(`✓ Fixed syntax error (removed extra };) in ${file}`);
  }
  
  // Case 2: Pattern ); but missing }; to close function (already converted format)
  // Check if we have ); followed directly by export without };
  // This means the file was already converted but missing closing brace
  if (content.match(/\);\s*\n\s*export\s+default/) && content.match(/return\s*\(/) && !content.match(/\);\s*\n\s*\};/)) {
    // Add }; before export
    content = content.replace(/(\);\s*)\n(\s*export\s+default)/g, '$1\n};\n\n$2');
    console.log(`✓ Fixed missing closing brace in ${file}`);
  }
  
  // Extract component name (e.g., SvgHome -> Home, SvgArrowLeftOutline -> ArrowLeftOutline)
  const componentNameMatch = content.match(/const (Svg\w+)/);
  if (!componentNameMatch) return;
  
  const svgComponentName = componentNameMatch[1];
  const componentName = svgComponentName.replace('Svg', '');
  
  // Replace SvgProps with custom interface
  content = content.replace(
    /import type { SvgProps } from "react-native-svg";/g,
    ''
  );
  
  // Add custom interface
  const interfaceCode = `interface ${componentName}Props {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

`;
  
  // Insert interface after imports
  const importEnd = content.indexOf('const ');
  content = content.slice(0, importEnd) + interfaceCode + content.slice(importEnd);
  
  // Replace component signature
  content = content.replace(
    new RegExp(`const ${svgComponentName} = \\(props: SvgProps\\) => \\(`),
    `const ${componentName} = (props: ${componentName}Props) => {
  const { width = 24, height = 24, ...restProps } = props;

  return (`
  );
  
  // Find and replace the entire Svg element - use a more robust approach
  const svgStartRegex = /<Svg\s+/;
  const svgEndRegex = />/;
  
  if (svgStartRegex.test(content)) {
    // Find the position of <Svg
    const svgStartIndex = content.search(svgStartRegex);
    const afterSvgStart = content.substring(svgStartIndex + 5); // After "<Svg "
    
    // Find the matching closing >
    let bracketCount = 0;
    let attrEndIndex = 0;
    for (let i = 0; i < afterSvgStart.length; i++) {
      if (afterSvgStart[i] === '>') {
        if (bracketCount === 0) {
          attrEndIndex = i;
          break;
        }
        bracketCount--;
      } else if (afterSvgStart[i] === '<') {
        bracketCount++;
      }
    }
    
    const fullSvgTag = content.substring(svgStartIndex, svgStartIndex + 5 + attrEndIndex + 1);
    const attrs = afterSvgStart.substring(0, attrEndIndex);
    
    // Parse attributes - split by whitespace, newlines, and handle quoted values
    const attrMap = new Map();
    const attrPattern = /(\w+(?:-\w+)*)\s*=\s*((?:["'][^"']*["']|\{[^}]+\}))/g;
    let match;
    
    while ((match = attrPattern.exec(attrs)) !== null) {
      const attrName = match[1];
      const attrValue = match[2];
      
      // Skip width, height, xmlns, and {...props}
      if (attrName === 'width' || attrName === 'height' || attrName === 'xmlns') {
        continue;
      }
      if (attrValue === '{...props}') {
        continue;
      }
      
      // Replace hard-coded colors
      let processedValue = attrValue;
      if (attrName === 'fill' && attrValue.match(/^["']#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})["']$/)) {
        const color = attrValue.match(/^["']#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})["']$/)[1];
        processedValue = `{props.color || "#${color}"}`;
      } else if (attrName === 'fill' && attrValue === '"black"') {
        processedValue = '{props.color || "#000"}';
      }
      
      attrMap.set(attrName, processedValue);
    }
    
    // Build new Svg tag
    const formattedAttrs = Array.from(attrMap.entries())
      .map(([name, value]) => `      ${name}=${value}`)
      .join('\n');
    
    const newSvg = formattedAttrs
      ? `<Svg
      width={width}
      height={height}
${formattedAttrs}
      {...restProps}
    >`
      : `<Svg
      width={width}
      height={height}
      {...restProps}
    >`;
    
    content = content.substring(0, svgStartIndex) + newSvg + content.substring(svgStartIndex + 5 + attrEndIndex + 1);
  }
  
  // Fix closing - properly close the return statement and component
  // After conversion, we have: return ( <Svg>...</Svg> );
  // This needs to become: return ( <Svg>...</Svg> );\n};
  
  // Replace pattern: </Svg> followed by ) (closing the return statement)
  // This should become </Svg>\n  );\n};
  content = content.replace(/(\s*<\/Svg>)\s*\)\s*;/g, `$1
  );
};`);
  
  // Handle cases where we have </Svg> ) without semicolon before export
  content = content.replace(/(\s*<\/Svg>)\s*\)\s*\n\s*export/g, `$1
  );
};

export`);
  
  // Clean up any remaining issues - ensure we have }; before export if missing
  // This should only apply to converted format (with return statement)
  if (content.match(/\);\s*\n\s*export\s+default/) && content.match(/return\s*\(/) && !content.match(/\);\s*\n\s*\};/)) {
    content = content.replace(/(\);\s*)\n(\s*export\s+default)/g, '$1\n};\n\n$2');
  }
  
  // Also replace fill with hard-coded colors in Path elements
  content = content.replace(
    /fill\s*=\s*["']#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})["']/g,
    'fill={props.color || "#$1"}'
  );
  content = content.replace(
    /fill\s*=\s*["']black["']/g,
    'fill={props.color || "#000"}'
  );
  
  // Update export
  content = content.replace(
    new RegExp(`export default ${svgComponentName};`),
    `export default ${componentName};`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Processed ${file}`);
});

// Update index.ts - sort alphabetically
const indexPath = path.join(iconsDir, 'index.ts');
const exports = files
  .map(file => {
    const componentName = file.replace('.tsx', '').replace(/^Svg/, '');
    return { name: componentName, file: file.replace('.tsx', '') };
  })
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(item => `export { default as ${item.name} } from './${item.file}';`)
  .join('\n');

fs.writeFileSync(indexPath, exports + '\n', 'utf8');
console.log('✓ Updated index.ts');

