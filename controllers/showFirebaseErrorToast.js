import { View, Text } from "react-native";
import React from "react";

const showFirebaseErrorToast = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid Email address";
      break;
    case "auth/wrong-password":
      return "Incorrect Password";
      break;
    case "auth/user-not-found":
      return "Email Not Found";
      break;

    default:
      return "Login Error";
      break;
  }
};

export default showFirebaseErrorToast;
