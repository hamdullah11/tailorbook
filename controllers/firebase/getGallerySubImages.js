import { StyleSheet, Text, View } from "react-native";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getGallerySubImages = async (Type, id) => {
  const reference = collection(db, "globalImageGallery", id, "subImages");
  let allImages = [];
  return getDocs(reference).then((docs) => {
    docs?.forEach((doc) => {
      allImages.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return allImages;
  });
};

export default getGallerySubImages;

const styles = StyleSheet.create({});
