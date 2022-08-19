import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Active from "../components/orders/Active";

import PastDue from "../components/orders/PastDue";
import Completed from "../components/orders/Completed";
import Upcoming from "../components/orders/Upcoming";
import Urgent from "../components/orders/Urgent";
import Delivered from "../components/orders/Delivered";
const TopTab = createMaterialTopTabNavigator();
const TopTabNavigation = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8645FF",
        tabBarInactiveTintColor: "#C5C3D6",
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 110 },
      }}
    >
      <TopTab.Screen name="Active" component={Active} options={{}} />
      <TopTab.Screen name="PastDue" component={PastDue} />
      <TopTab.Screen name="Completed" component={Completed} />
      <TopTab.Screen name="Upcoming" component={Upcoming} />
      <TopTab.Screen name="Urgent" component={Urgent} />
      <TopTab.Screen name="Delivered" component={Delivered} />
    </TopTab.Navigator>
  );
};

export default TopTabNavigation;

const styles = StyleSheet.create({});
