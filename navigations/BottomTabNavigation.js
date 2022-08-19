import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Orders from "../components/mainScreenComponents/Order";
import AddClient from "../components/mainScreenComponents/AddClient";
import Gallery from "../components/mainScreenComponents/Gallery";
import TopTabNavigation from "./TopTabNavigation";
import { MaterialIcons, Ionicons, Fontisto } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        // justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "white",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
const CustomTabBar = () => {
  return (
    <ImageBackground
      source={require("../assets/hamd.png")}
      // resizeMode="contain"
      style={{
        width: width * 1.01,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <MaterialIcons name="receipt-long" size={24} color="black" />
          <Text>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            {
              // marginBottom: 10,
              // marginLeft: 107,
              // marginTop: -50,
            }
          }
        >
          <Ionicons name="add-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="camera" size={24} color="black" />
          <Text>Gallery</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      // tabBar={() => {
      //   return <CustomTabBar />;
      // }}
      screenOptions={{
        // tabBarStyle: { height: 300 },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#8645FF",

        tabBarStyle: {
          backgroundColor: "white",
          height: 70,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}
    >
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          //   showLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                // justifyContent: "center ",
              }}
            >
              <MaterialIcons
                name="receipt-long"
                size={30}
                style={{
                  color: focused ? "#8645FF" : "#C5C3D6",
                }}
              />
              <Text
                style={{
                  color: focused ? "#8645FF" : "#C5C3D6",
                  fontSize: 12,
                }}
              >
                Orders
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AddClient"
        component={AddClient}
        options={{
          // headerShown: true,
          // tabBarIcon: ({ color, size }) => (
          //   <Image
          //     source={require("../assets/addClient.png")}
          //     color={color}
          //     size={size}
          //   />
          // ),
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                shadowColor: "#7F5DF0",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
              }}
              onPress={props.onPress}
            >
              <Ionicons
                name="add-circle"
                size={65}
                color="#8645FF"
                style={{
                  marginTop: -width * 0.07,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarLabel: "Gallery",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Fontisto
                name="camera"
                size={25}
                style={{
                  color: focused ? "#8645FF" : "#C5C3D6",
                }}
              />
              <Text
                style={{
                  color: focused ? "#8645FF" : "#C5C3D6",
                  fontSize: 12,
                }}
              >
                Gallery
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
