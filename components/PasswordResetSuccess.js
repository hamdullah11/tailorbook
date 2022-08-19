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
const PasswordResetSuccess = ({ navigation }) => {
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
        <Image source={require("../assets/passwordResetSuccess.png")} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Password Changed!
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "normal" }}>
          Your passsword has been changed sucessfully.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "white" }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordResetSuccess;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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

    // marginTop: height * 0.01,
  },
});
