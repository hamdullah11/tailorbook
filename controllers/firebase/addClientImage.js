import { View, Text } from "react-native";
import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const addClientImage = async (photo, clientName, isClothImg) => {
  //   console.log(photo, clientName);
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
    xhr.open("GET", photo, true);
    xhr.send(null);
  });
  const storage = getStorage();
  let imgExtension = photo.split(".").pop();
  if (isClothImg) {
    let clientImageRef = ref(
      storage,
      `clients/clientClothImages/${clientName}.${imgExtension}`
    );
    let response = await uploadBytes(clientImageRef, blob);
    if (response) {
      console.log(response.snapshot);
      return true;
    }
  } else {
    let clientImageRef = ref(
      storage,
      `clients/clientImages/${clientName}.${imgExtension}`
    );
    let response = await uploadBytes(clientImageRef, blob);
    if (response) {
      console.log(response.snapshot);
      return true;
    }
  }

  // .then((snapshot) => {
  //   console.log("Uploaded a blob or file!");
  //   return true;
  // })
  // .catch((error) => {
  //   console.log(error.message);
  //   return error.message;
  // });
};

export default addClientImage;
