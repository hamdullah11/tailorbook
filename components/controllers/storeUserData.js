import { View, Text } from "react-native";
import React from "react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import uploadSliderImages from "./uploadSliderImages";

const storeUserData = (uid, name, email, contact) => {
  let ref = doc(db, "users", uid);

  setDoc(ref, {
    name,
    email,
    contact,
  }).then(() => {
    //Copy Gallery images form the global and store it in the user gallery
    let ref = collection(db, "globalImageGallery");
    let images = [];
    let sliderImages = [];
    getDocs(ref)
      .then((docs) => {
        docs.forEach((doc) => {
          images.push({
            ...doc.data(),
          });
        });
      })
      .then(() => {
        let ref = collection(db, "users", uid, "gallery");
        images.forEach(async (img) => {
          await addDoc(ref, img);
        });
      });
  });
};
export default storeUserData;
