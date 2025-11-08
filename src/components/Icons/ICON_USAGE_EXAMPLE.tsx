/**
 * Icon Usage Example
 * 
 * This file demonstrates how to import and use the generated SVG icons
 * in your React Native screens and components.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Home } from './index';

export const IconUsageExample = () => {
  return (
    <View style={styles.container}>
      {/* Basic usage with default color */}
      <View style={{ marginBottom: 20 }}>
        <Home />
      </View>

      {/* Custom color */}
      <View style={{ marginBottom: 20 }}>
        <Home color="#FF5733" />
      </View>

      {/* Custom size and color */}
      <View style={{ marginBottom: 20 }}>
        <Home width={32} height={32} color="#4CAF50" />
      </View>

      {/* Custom size, color, and additional props */}
      <View style={styles.icon}>
        <Home 
          width={48} 
          height={48} 
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 10,
  },
});

