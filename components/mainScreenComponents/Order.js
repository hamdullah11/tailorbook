import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");
import TopTabNavigation from "../../navigations/TopTabNavigation";

const Order = () => {
  return <TopTabNavigation />;
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
