import { View, Text } from "react-native";
import React from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const storeUserData = (uid, name, email, contact) => {
  let ref = doc(db, "users", uid);

  setDoc(ref, {
    name,
    email,
    contact,
  });
};
export default storeUserData;
