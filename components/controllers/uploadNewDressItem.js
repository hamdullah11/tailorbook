import { View, Text, Button } from "react-native";
import React, { useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";

const uploadNewDressItem = () => {
  //   const [status, requestPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef();
  useEffect(() => {
    const takePermissions = async () => {
      //   let { status } = await MediaLibrary.re;
      let cameraPermission = await Camera.requestCameraPermissionsAsync();
    };
    takePermissions();
  });
  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
  };
  return (
    <Camera ref={cameraRef}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="Take Pic" onPress={takePic} />
      </View>
    </Camera>
  );
};

export default uploadNewDressItem;
