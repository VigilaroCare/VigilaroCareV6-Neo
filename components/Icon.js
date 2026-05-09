import React from 'react';
import { View, Image } from 'react-native';

const Icon = ({ name, category = 'navigation', size = 24, color, style }) => {
  // Temporariamente retornar um quadrado colorido para testar
  return (
    <View 
      style={[
        { 
          width: size, 
          height: size, 
          backgroundColor: color || '#2563EB',
          borderRadius: 4
        }, 
        style
      ]} 
    />
  );
};

export default Icon;