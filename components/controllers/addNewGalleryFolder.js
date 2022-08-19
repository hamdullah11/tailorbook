import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
// Save file in the Phone

const saveFile = async (uri) => {
  const { status } = await MediaLibrary.getPermissionsAsync();
  console.log(status);
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
  }
  // console.log(
  //   await FileSystem.readDirectoryAsync(
  //     FileSystem.documentDirectory + "Download"
  //   )
  // );
};

const addNewGalleryFolder = async (
  folderName,
  galleryImages,
  setGalleryImages
) => {
  // console.log(folderName, galleryImages);
  // let ref = [...galleryImages];
  // console.log(ref.length - 1);
  // ref.push({
  //   id: ref.length,
  //   name: folderName,
  //   img: null,
  // });
  // setGalleryImages([...ref]);
  let localImageUri;
  let imageUri =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg";
  let fileUri = FileSystem.documentDirectory + "small.jpg";
  FileSystem.downloadAsync(imageUri, fileUri)
    .then(async ({ uri }) => {
      // saveFile(uri);
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
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const storage = getStorage();
      let imgRef = ref(storage, `Gallery/${folderName}.jpg`);
      let response = await uploadBytes(imgRef, blob);
      if (response) {
        return true;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export default addNewGalleryFolder;
