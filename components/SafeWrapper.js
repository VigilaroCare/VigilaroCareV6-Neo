import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeWrapper({
  children,
  padded = false,  // <- se true, aplica margin lateral
  background = "#FFFFFF",
}) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]} edges={['top', 'bottom', 'left', 'right']}>
      <View
        style={[
          styles.content,
          padded && styles.padded, // aplica padding só quando pedido
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
  },
});
