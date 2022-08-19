import "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  BackHandler,
  Alert,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native";

import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SelectLanguage from "./components/SelectLanguage";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import CreateNewPassword from "./components/CreateNewPassword";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import MainScreen from "./components/MainScreen";
import AddNewClient from "./components/addClient/NewClient";
import OrderDetails from "./components/orders/OrderDetails";
import GallerySubTypes from "./components/mainScreenComponents/gallerySubTypes/GallerySubTypes";
import AddNewClientDetails from "./components/addClient/AddClientDetails";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
import Contacts from "./components/showContacts/Contacts";
import { NavigationContainer } from "@react-navigation/native";
import UploadDressItem from "./components/uploadDressItem/UploadDressItem";
import UploadClientImage from "./components/addClient/UploadClientImage";
import UploadClientClothImg from "./components/addClient/UploadClientClothImg";
import SelectPatternImage from "./components/addClient/SelectPatternImage";
import Gallery from "./components/mainScreenComponents/Gallery";
import GallerySubTypesSlider from "./components/mainScreenComponents/gallerySubTypes/GallerySubTypesSlider";

const { width, height } = Dimensions.get("screen");

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerTitle: "",
          // headerBackTitleVisible: false,
          headerBackVisible: false,

          headerBlurEffect: false,
          headerShadowVisible: false,
          headerStyle: {
            headerLeft: ({ onPress, focused }) => <Text>Haskldhf</Text>,
          },
        }}
      />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PasswordResetSuccess"
        component={PasswordResetSuccess}
      />
    </Stack.Navigator>
  );
};

const NormalStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectLanguage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={SelectLanguage} />

      <>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AddNewClient" component={AddNewClient} />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Kurta",
            headerTitleAlign: "center",
          }}
          name="GallerySubTypes"
          component={GallerySubTypes}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Zakir Ullah",
            headerTitleAlign: "center",
          }}
          name="AddNewClientDetails"
          component={AddNewClientDetails}
        ></Stack.Screen>
      </>
    </Stack.Navigator>
  );
};
const RootNavigation = () => {
  console.log(loginToken);

  return (
    <NavigationContainer>
      {state.userLogin == false ? <AuthStack /> : <NormalStack />}
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SelectLanguage"
          component={SelectLanguage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: true,
            headerTitle: "",
            // headerBackTitleVisible: false,
            headerBackVisible: false,

            headerBlurEffect: false,
            headerShadowVisible: false,
            headerStyle: {
              headerLeft: ({ onPress, focused }) => <Text>Haskldhf</Text>,
            },
          }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPassword}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="PasswordResetSuccess"
          component={PasswordResetSuccess}
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AddNewClient" component={AddNewClient} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />

        <Stack.Screen
          options={({ route }) => ({
            title: route.params.name,
            headerTitleAlign: "center",
          })}
          name="GallerySubTypes"
          component={GallerySubTypes}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Zakir Ullah",
            headerTitleAlign: "center",
          }}
          name="AddNewClientDetails"
          component={AddNewClientDetails}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Choose a contact",
            headerTitleAlign: "center",
          }}
          name="Contacts"
          component={Contacts}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },
            headerRight: () => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="reload"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialIcons
                      name="flip"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <Text
                      style={{ color: "white", marginHorizontal: width * 0.03 }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
          name="UploadDressItem"
          component={UploadDressItem}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },
            headerRight: () => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="reload"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialIcons
                      name="flip"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <Text
                      style={{ color: "white", marginHorizontal: width * 0.03 }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
          name="UploadClientImage"
          component={UploadClientImage}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },
            headerRight: () => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="reload"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialIcons
                      name="flip"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <Text
                      style={{ color: "white", marginHorizontal: width * 0.03 }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
          name="UploadClientClothImg"
          component={UploadClientClothImg}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },
            headerRight: () => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="reload"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <MaterialIcons
                      name="flip"
                      size={24}
                      color="white"
                      style={{
                        marginHorizontal: width * 0.03,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      ToastAndroid.showWithGravity(
                        "Please select Image first",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    }}
                  >
                    <Text
                      style={{ color: "white", marginHorizontal: width * 0.03 }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            },
          }}
          name="SelectPatternImage"
          component={SelectPatternImage}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "Gallery",
            headerTitleAlign: "center",
          }}
          name="Gallery"
          component={Gallery}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="GallerySubTypesSlider"
          component={GallerySubTypesSlider}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
