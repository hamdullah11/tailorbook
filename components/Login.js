import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Checkbox } from "react-native-paper";
import { useForm } from "react-hook-form";

const { width, height } = Dimensions.get("window");
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  signInWithRedirect,
  inMemoryPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import showFirebaseErrorToast from "./controllers/showFirebaseErrorToast";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

const Login = ({ navigation, route }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [checked, setChecked] = useState(false);

  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [loginBtnDisableStatus, setLoginBtnDisableStatus] = useState(true);
  const [showPassword, setShowPassword] = useState({
    hidePassword: true,
    iconType: "eye",
  });

  const changePasswordStatus = () => {
    setShowPassword({
      iconType: showPassword.iconType == "eye" ? "eye-off" : "eye",
      hidePassword: !showPassword.hidePassword,
    });
  };
  useEffect(() => {
    if (userMail.length && password.length) {
      setLoginBtnDisableStatus(false);
    }
  }, [userMail, password]);

  const setUserEmailAddress = (mail) => {
    setUserMail(mail);
  };
  const setUserPassword = (password) => {
    setPassword(password);
  };

  const loginUser = () => {
    const auth = getAuth();
    setLoader(true);
    signInWithEmailAndPassword(auth, userMail, password)
      .then(async (userCredential) => {
        // Signed in
        setLoader(false);
        const user = userCredential.user;
        if (checked) {
          try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem("loginUser", jsonValue);
            navigation.navigate("MainScreen");
          } catch (e) {
            // saving error
            console.log(e);
          }
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error.code);
        let message = showFirebaseErrorToast(error.code);
        console.log(message);
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
      });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{
        // width: "100%",
        paddingVertical: width * 0.18,
        showsVerticalScrollIndicator: false,
        paddingHorizontal: width * 0.02,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View style={styles.container}>
          <Image source={require("../assets/login.png")} />
          <Text style={{ fontSize: 20 }}>Login to Your Account</Text>
          <Text style={{ fontSize: 15 }}>
            Welcome Back,please enter your details.
          </Text>
        </View>

        <Text
          style={{
            color: "#1B2B41",
            marginTop: width * 0.03,
            marginBottom: width * 0.01,
          }}
        >
          Email Address
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Johndoe@gmail.com"
          onChangeText={(mail) => {
            setUserEmailAddress(mail);
          }}
          value={userMail}
        />
        <Text
          style={{
            color: "#1B2B41",
            marginTop: width * 0.03,
            marginBottom: width * 0.01,
          }}
        >
          Password
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            borderWidth: 1,
            borderColor: "rgba(28,90,55,0.16)",
            padding: width * 0.04,
            borderRadius: width * 0.01,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Enter your password"
            onChangeText={(password) => {
              setPassword(password);
            }}
            secureTextEntry={showPassword.hidePassword}
          />
          <TouchableOpacity onPress={changePasswordStatus}>
            <Feather
              name={showPassword.iconType}
              size={24}
              color="rgba(28,46,69,0.60)"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: width * -0.02,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              color="#8645FF"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ color: "#1B2B41" }}>Remember Me</Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "#1B2B41" }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          disabled={loginBtnDisableStatus}
          style={[
            loginBtnDisableStatus ? styles.Activebutton : styles.disableBtn,
          ]}
          onPress={() => {
            if (userMail == "" || password == "") {
              if (userMail == "") {
                ToastAndroid.showWithGravityAndOffset(
                  "Please Enter Email Address",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
              }
              if (password == "") {
                ToastAndroid.showWithGravityAndOffset(
                  "Please Enter password",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
              }
            } else {
              loginUser();
            }
          }}
        >
          <Text style={{ color: "white" }}>
            {!loader ? "Log in" : <ActivityIndicator color="#ffffff" />}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: width * 0.08,
            marginVertical: width * 0.02,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#A5AEBB",
            }}
          />
          <View>
            <Text style={{ width: 50, textAlign: "center", color: "#A5AEBB" }}>
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "#A5AEBB" }} />
        </View>

        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => navigation.navigate("Login", { name: "Jane" })}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{ marginHorizontal: width * 0.02 }}>
              <Image source={require("../assets/googleLogo.png")} />
            </View>
            <View>
              <Text
                style={{ color: "rgba(27,43,65,0.72)", fontWeight: "bold" }}
              >
                Continue with Google
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: height * 0.02,
          }}
        >
          <Text style={{ textAlign: "center" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#8645FF" }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  input: {
    height: height * 0.08,
    // margin: 12,

    borderWidth: 1,
    padding: 10,

    borderWidth: 1,

    borderRadius: 3,
    borderColor: "#c5c5c5",
  },
  Activebutton: {
    alignItems: "center",
    backgroundColor: "rgba(155, 113, 232, 0.5)",

    borderRadius: 3,
    padding: height * 0.027,
    // marginHorizontal: width * 0.03,
    marginTop: height * 0.01,
  },
  disableBtn: {
    alignItems: "center",
    backgroundColor: "rgba(155, 113, 232, 1)",

    borderRadius: 3,
    padding: height * 0.027,
    // marginHorizontal: width * 0.03,
    marginTop: height * 0.01,
  },
  googleBtn: {
    alignItems: "center",
    borderColor: "rgba(28,52,84,0.26)",
    borderWidth: 1,

    borderRadius: 3,
    padding: height * 0.027,
    // marginHorizontal: width * 0.03,
    marginTop: height * 0.01,
  },
});
