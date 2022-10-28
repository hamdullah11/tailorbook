import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
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
  let uid = getAuth().currentUser.uid;

  let ref = collection(db, "users", uid, "gallery");
  try {
    addDoc(ref, {
      Imgurl: "",
      name: folderName,
    });
    return true;
  } catch (error) {
    console.log(err);
  }
};

export default addNewGalleryFolder;
