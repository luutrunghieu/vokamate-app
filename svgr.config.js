module.exports = {
  typescript: true,
  native: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
  replaceAttrValues: {
    "#000": "{props.color || '#000'}",
    "#000000": "{props.color || '#000'}",
    black: "{props.color || '#000'}",
    currentColor: "{props.color || 'currentColor'}",
  },
};
