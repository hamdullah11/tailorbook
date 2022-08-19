import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const ForgotPassword = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "space-around",?
        paddingHorizontal: width * 0.03,
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 24, color: "#000000", fontWeight: "bold" }}>
          Forgot Password?
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#1A293D",
            fontWeight: "300",
            marginVertical: width * 0.02,
          }}
        >
          Enter the email adress or phone number associated with your account to
          recive password reset code.
        </Text>
      </View>
      <View
        style={{
          marginTop: height * 0.03,
        }}
      >
        <Text style={{ color: "#5A6675", marginVertical: width * 0.01 }}>
          Email/Phone Number
        </Text>
        <TextInput style={styles.input} placeholder="example@gmail.com" />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateNewPassword")}
      >
        <Text style={{ color: "white" }}>Send Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    marginVertical: width * 0.08,
  },
  input: {
    height: height * 0.08,

    borderWidth: 1,
    padding: 10,

    borderWidth: 1,

    borderRadius: 3,
    borderColor: "#c5c5c5",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#9B71E8",

    borderRadius: 3,
    padding: height * 0.027,

    // marginTop: height * 0.01,
    marginVertical: width * 0.1,
  },
});
