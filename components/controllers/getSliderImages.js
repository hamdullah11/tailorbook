import { View, Text } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getSliderImages = async () => {
  let uid = getAuth().currentUser.uid;

  let sliderImages = [];

  let ref = collection(db, "users", uid, "slider");

  return getDocs(ref).then((docs) => {
    docs.forEach((doc) => {
      sliderImages.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return sliderImages;
  });
};

export default getSliderImages;
