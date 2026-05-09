/**
 * TabIcon.js
 * Ícone personalizado para a barra inferior do Vigilaro Care
 */

import React from 'react';
import { View, Text } from 'react-native';

export default function TabIcon({ focused, icon, label }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 22 }}>{icon}</Text>
      <Text
        style={{
          fontSize: 12,
          color: focused ? '#007bff' : '#888',
          fontWeight: focused ? 'bold' : 'normal',
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
