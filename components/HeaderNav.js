import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NeoIcon from './NeoIcon';
import { useNavigation } from "@react-navigation/native";

export default function HeaderNav({ titulo = "" }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
        <NeoIcon name="ArrowLeft2" size={22} color="#1A73E8" />
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>{titulo}</Text>

      {/* Botão Home */}
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs")} style={styles.btn}>
        <NeoIcon name="Home2" size={22} color="#1A73E8" />
        <Text style={styles.btnText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    color: "#1A73E8",
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
