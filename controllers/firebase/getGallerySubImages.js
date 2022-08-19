import { StyleSheet, Text, View } from "react-native";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import React from "react";

const getGallerySubImages = async () => {
  const storage = getStorage();
  const reference = ref(storage, "/Gallery/GallarySubItems/KurtaImages");
  let allImages = [];
  let allImageRef = await listAll(reference);
  if (allImageRef.items.length) {
    for (let i = 0; i < allImageRef.items.length; i++) {
      let url = await getDownloadURL(allImageRef.items[i]);

      allImages.push(url);
      if (i == allImageRef.items.length - 1) {
        return allImages;
      }
    }
  }
};

export default getGallerySubImages;

const styles = StyleSheet.create({});
