import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "react-native-paper";
import { AntDesign, Feather } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";

const { width, height } = Dimensions.get("window");

import app from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import * as Google from "expo-auth-session/providers/google";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .matches(/(\+91\ )[6-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{3}/, {
        message: "Invalid Indian number",
        excludeEmptyString: false,
      })
      .required(),
    password: yup.string().min(6),
  })
  .required();

const Register = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("310 1122123");
  const [request, response, promptAsync] = Google.useAuthRequest({
    behavior: "web",
    expoClientId:
      "635753411932-ji3i79pdi683h2cfkp28dv1j7lt0dui7.apps.googleusercontent.com",
  });
  const phoneRef = useRef(undefined);

  const [showPassword, setShowPassword] = useState({
    hidePassword: true,
    iconType: "eye",
  });

  const auth = getAuth();
  const [userDetail, setUserDetail] = useState({
    userName: "",
    userEmail: "",
    userContactNo: "",
    userPassword: "",
  });
  const [loader, setLoader] = useState(false);

  const changePasswordStatus = () => {
    setShowPassword({
      iconType: showPassword.iconType == "eye" ? "eye-off" : "eye",
      hidePassword: !showPassword.hidePassword,
    });
  };

  const handelSignUp = () => {
    setLoader(true);
    const checkValid = phoneRef.current?.isValidNumber(phoneNumber);
    console.log(checkValid);

    if (!checked) {
      ToastAndroid.showWithGravity(
        "Please agree to the term of services",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setLoader(false);
      return;
    }
    if (!checkValid) {
      ToastAndroid.showWithGravity(
        "Phone number is not valid",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setLoader(false);
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      userDetail.userEmail,
      userDetail.userPassword
    )
      .then((userCredentials) => {
        const user = userCredentials.user;
        user.displayName = userDetail.userName;
        user.phoneNumber = userDetail.userContactNo;

        ToastAndroid.showWithGravity(
          "Successfully Registered",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        // console.log("hamd", user);

        // navigation.navigate("Login");
      })
      .catch((error) => alert(error));
    setLoader(false);
  };

  const continueWithGoogle = async () => {
    await promptAsync();
    console.log(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          marginTop: width * 0.09,
        }}
      >
        <View style={styles.container}>
          <Image source={require("../assets/login.png")} />
          <Text style={{ fontSize: 20 }}>Create an Account</Text>
          <Text style={{ fontSize: 10 }}>
            Sign up now to get started with an account.
          </Text>
        </View>
        <View
          style={{
            marginTop: height * 0.01,
          }}
        >
          <Text style={{ marginLeft: 12, color: "#8645FF" }}>
            FullName
            <Text
              style={{
                color: "red",
              }}
            >
              *
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: width * 0.03,
              borderWidth: 1,
              borderColor: "rgba(28,90,55,0.16)",
              padding: width * 0.04,
              borderRadius: width * 0.01,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Enter your Name"
              // onChangeText={(uName) => {
              //   setUserDetail({
              //     ...userDetail,
              //     userName: uName,
              //   });
              // }}
              {...register("fullName")}
            />
          </View>
          <Text
            style={{
              marginLeft: 12,
              color: "#1B2B41",
              marginTop: width * 0.01,
            }}
          >
            Email Address
            <Text
              style={{
                color: "red",
              }}
            >
              *
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: width * 0.03,
              borderWidth: 1,
              borderColor: "rgba(28,90,55,0.16)",
              padding: width * 0.04,
              borderRadius: width * 0.01,
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Enter your Email"
              keyboardType="email-address"
              onChangeText={(email) => {
                setUserDetail({
                  ...userDetail,
                  userEmail: email,
                });
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: 12,
              color: "#1B2B41",
              marginTop: width * 0.01,
            }}
          >
            Phone Number
            <Text
              style={{
                color: "red",
              }}
            >
              *
            </Text>
          </Text>

          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "#FBFBFB",
            }}
          >
            <PhoneInput
              ref={phoneRef}
              defaultValue={phoneNumber}
              international={false}
              initialValueFormat="national"
              defaultCode="PK"
              layout="second"
              onChangeText={(text) => {
                // console.log(phoneRef.current?.getCountryCode());
                setPhoneNumber(text);
              }}
              containerStyle={{
                backgroundColor: "#FBFBFB",
                borderRadius: 4,
                width: "100%",
                borderWidth: 1,
                borderColor: "rgba(28,55,90,0.16)",
              }}
              textInputStyle={{
                backgroundColor: "#FBFBFB",
              }}
            />
          </View>
          {/* <TextInput
              placeholder="Enter your Phone Number"
              keyboardType="number-pad"
              onChangeText={(contactNo) => {
                setUserDetail({
                  ...userDetail,
                  userContactNo: contactNo,
                });
              }}
            /> */}
          {/* </View> */}
          <Text
            style={{
              marginLeft: 12,
              color: "#1B2B41",

              marginTop: width * 0.01,
            }}
          >
            Password
            <Text
              style={{
                color: "red",
              }}
            >
              *
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: width * 0.03,
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
                setUserDetail({
                  ...userDetail,
                  userPassword: password,
                });
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
        </View>

        <View
          style={{
            marginLeft: 5,
            marginRight: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              color="#8645FF"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ color: "#1B2B41" }}>
              I have read and agree to the
            </Text>
            <Text style={{ color: "#8645FF", textDecorationLine: "underline" }}>
              Terms Of Services
            </Text>
          </View>

          <View></View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handelSignUp}>
          <Text style={{ color: "white" }}>
            {loader ? <ActivityIndicator color="#ffffff" /> : "Get Started"}
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

        <TouchableOpacity style={styles.googleBtn} onPress={continueWithGoogle}>
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
            marginTop: height * 0.01,
          }}
        >
          <Text style={{ textAlign: "center" }}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#8645FF" }}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // height: height * 0.23,
  },
  input: {
    height: height * 0.07,
    margin: 12,
    borderWidth: 1,
    padding: 10,

    borderRadius: 3,
    borderColor: "#c5c5c5",
    marginTop: -height * 0.001,
    backgroundColor: "#FBFBFB",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#9B71E8",

    borderRadius: 3,
    padding: height * 0.027,
    marginHorizontal: width * 0.03,
    marginTop: height * 0.01,
  },
  googleBtn: {
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#617084",
    padding: height * 0.021,
    marginHorizontal: width * 0.03,
    marginTop: height * 0.001,
  },
});
