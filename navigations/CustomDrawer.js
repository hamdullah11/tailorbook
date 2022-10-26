import React from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();

export const CustomDrawer = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#DFDEDF",
      }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          paddingRight: 10,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 15,
          }}
          onPress={() => {
            signOut(auth)
              .then(async () => {
                await AsyncStorage.clear();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#8645FF",
              padding: 20,
              borderRadius: 5,
            }}
          >
            <Ionicons name="exit-outline" size={22} color="#ffffff" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                color: "#ffffff",
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
