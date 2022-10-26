import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import Orders from "./mainScreenComponents/Order";
import AddClient from "./mainScreenComponents/AddClient";

import Gallery from "./mainScreenComponents/Gallery";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "../navigations/BottomTabNavigation";
import TopTab from "../navigations/TopTabNavigation";
import DrawerNavigation from "../navigations/DrawerNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import OrderDetails from "../components/orders/OrderDetails";
import { CustomDrawer } from "../navigations/CustomDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerRight: ({ tintColor, focused }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="search"
              color={focused ? "white" : "#FFFFFF"}
              style={{
                fontSize: 25,
                marginHorizontal: 15,
              }}
            />
            <Ionicons
              name="notifications"
              color={focused ? "#FFFFFF" : "#FFFFFF"}
              style={{
                fontSize: 25,
              }}
            />
          </View>
        ),

        headerStyle: {
          backgroundColor: "#8645FF",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitle: <Text>TailorBook.</Text>,
      }}
    >
      <Drawer.Screen
        name="BottomTabNavigation."
        component={BottomTabNavigation}
        options={{ title: "TailorBook." }}
      />
    </Drawer.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
