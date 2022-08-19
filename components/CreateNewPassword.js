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
const CreateNewPassword = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        marginHorizontal: width * 0.03,
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 24, color: "#000000", fontWeight: "bold" }}>
          Create New Password
        </Text>
        <Text style={{ fontSize: 14, color: "#1A293D", fontWeight: "300" }}>
          Reset Code Was Sent To Your Mail. Please Enter The Code & Create New
          Password.
        </Text>
      </View>
      <View
        style={{
          marginTop: height * 0.03,
        }}
      >
        <Text style={{ color: "#1B2B41" }}>Reset Code</Text>
        <TextInput style={styles.input} placeholder="example@gmail.com" />
        <Text style={{ color: "#1B2B41" }}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={"dksafasdkfna"}
        />
        <Text style={{ color: "#1B2B41" }}>Confirm Password </Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={"dksafasdkfna"}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PasswordResetSuccess")}
      >
        <Text style={{ color: "white" }}>Reset Password</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: height * 0.01,
        }}
      >
        <Text style={{ color: "#C5C3D6" }}>Having Problem?</Text>
        <Text style={{ color: "#6534BF", marginHorizontal: width * 0.01 }}>
          Resend
        </Text>
      </View>
    </View>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "flex-start",
    // height: height * 0.23,
  },
  input: {
    height: height * 0.08,

    borderWidth: 1,
    padding: 10,
    // width: width * 0.9,
    borderWidth: 1,
    // elevation: 1,
    borderRadius: 3,
    borderColor: "#c5c5c5",
    marginBottom: height * 0.02,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#9B71E8",

    borderRadius: 3,
    padding: height * 0.027,

    marginTop: height * 0.01,
  },
  googleBtn: {
    alignItems: "center",
    backgroundColor: "white",

    borderRadius: 3,
    padding: height * 0.027,
    marginHorizontal: width * 0.03,
    marginTop: height * 0.01,
  },
});
