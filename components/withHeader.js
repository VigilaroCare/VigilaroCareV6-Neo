import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderNav from "../components/HeaderNav";

export default function withHeader(ScreenComponent, titulo = null) {
  return function (props) {
    return (
      <View style={styles.screenContainer}>
        <HeaderNav titulo={titulo || props.route?.name || ""} />
        <View style={styles.contentContainer}>
          <ScreenComponent {...props} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
