import { View, Text } from "react-native";
import React from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const uploadSliderDressImage = async (photo, clothName) => {
  let uid = getAuth().currentUser.uid;
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

  const sliderImageRef = ref(storage, `${uid}/${clothName}.${imgExtension}`);

  uploadBytes(sliderImageRef, blob, metadata)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
      let path = snapshot.ref.fullPath;

      getDownloadURL(ref(storage, path))
        .then((url) => {
          let path = collection(db, "users", uid, "slider");
          addDoc(path, {
            link: url,
            name: clothName,
          }).then(console.log("doc added"));
        })
        .catch((err) => {});
    })
    .catch((error) => {
      console.log(error.message);
      return error.message;
    });
};

export default uploadSliderDressImage;
