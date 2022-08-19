import React, { useEffect, useRef, useState } from "react";
// import * as MediaLibrary from "expo-media-library";
// import { Camera } from "expo-camera";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import uploadSliderDressImage from "../../controllers/firebase/uploadSliderDressImage";

const { height, width } = Dimensions.get("screen");

const UploadNewDressItem = ({ navigation, route }) => {
  const [photo, setPhoto] = useState();
  const [hasGalleryPermission, setHasGallery] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [uploading, setUploading] = useState(false);

  let clothName = route.params.clothName;

  useEffect(() => {
    const takePermissions = async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGallery(galleryStatus.status == "granted");
      setHasCameraPermission(cameraStatus.status == "granted");
    };
    takePermissions();
  }, []);
  const uploadFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
      setUploading(true);
      let response = uploadSliderDressImage(result.uri, clothName);
      if (response) {
        setTimeout(() => {
          setUploading(false);

          navigation.goBack();
        }, 3000);
      }
    }
  };
  const uploadThroughCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);

      let response = uploadSliderDressImage(result.uri, clothName);
    }
  };
  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {uploading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#161515",
          }}
        >
          <ActivityIndicator size="large" color="white" />
          <Text style={{ color: "white" }}>Uploading Image!</Text>
        </View>
      )}
      <View style={styles.centeredView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "white",
            height: height * 0.2,
            borderTopLeftRadius: width * 0.07,
            borderTopRightRadius: width * 0.07,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={uploadThroughCamera}
          >
            <FontAwesome name="camera" size={24} color="#8645FF" />
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={uploadFromGallery}
          >
            <FontAwesome name="photo" size={24} color="#8645FF" />
            <Text>Photos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // </View>
  );
};

export default UploadNewDressItem;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
    // marginTop: 22,
    backgroundColor: "#161515",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
