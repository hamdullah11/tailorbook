import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ForgotPassword from "../components/ForgotPassword";
import Login from "../components/Login";
const Drawer = createDrawerNavigator();
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { CustomDrawer } from "./CustomDrawer";

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
