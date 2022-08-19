import { View, Text } from "react-native";
import React from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const uploadSliderDressImage = async (photo, clothName) => {
  // Create  a Blob for Image
  let metadata = {
    clothName: clothName,
  };
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // on load
    xhr.onload = function () {
      resolve(xhr.response);
    };
    // on error
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    // on complete
    xhr.responseType = "blob";
    xhr.open("GET", photo, metadata, true);
    xhr.send(null);
  });

  const storage = getStorage();

  let imgExtension = photo.split(".").pop();

  const sliderImageRef = ref(
    storage,
    `clothTypes/${clothName}.${imgExtension}`
  );

  uploadBytes(sliderImageRef, blob, metadata)
    .then((snapshot) => {
      1;
      console.log("Uploaded a blob or file!");
      return true;
    })
    .catch((error) => {
      console.log(error.message);
      return error.message;
    });
};

export default uploadSliderDressImage;
