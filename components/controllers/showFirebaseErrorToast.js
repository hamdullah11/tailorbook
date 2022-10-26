import { View, Text } from "react-native";
import React from "react";

const showFirebaseErrorToast = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      alert("Invalid Email address");
      break;
    case "auth/wrong-password":
      alert("Incorrect Password");
      break;
    case "auth/user-not-found":
      alert("User not found");
      break;
    case "auth/email-already-in-use":
      alert("email-already-in-use");
      break;

    default:
      alert("Login Error");
      break;
  }
};

export default showFirebaseErrorToast;
