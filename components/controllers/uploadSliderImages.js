import { View, Text } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const uploadSliderImages = () => {
  //Copy all the image from the global slider and save it in the user slider

  let uid = getAuth().currentUser.uid;
  let ref = collection(db, "sliderImages");
  let images = [];
  getDocs(ref)
    .then((docs) => {
      docs.forEach((doc) => {
        images.push({
          ...doc.data(),
        });
      });
    })
    .then(() => {
      let ref = collection(db, "users", uid, "slider");
      images.forEach(async (img) => {
        await addDoc(ref, img);
      });
    });
};
export default uploadSliderImages;
