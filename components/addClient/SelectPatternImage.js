import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import addClientImage from "../../controllers/firebase/addClientImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");
const SelectPatternImage = ({ navigation, route }) => {
  const [uploading, setUploading] = useState(false);
  const [photo, setPhoto] = useState();

  let { userName } = route.params;
  console.log(userName);
  let isClothImg = false,
    clientImg;

  const uploadThroughCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);

      setUploading(true);
      let response = await addClientImage(result.uri, clientName, isClothImg);
      console.log("hamd", isClothImg);
      if (response) {
        try {
          clientImg = JSON.stringify(result.uri);

          await AsyncStorage.setItem("ClientImage", clientImg);
        } catch (e) {
          // saving error
          console.log(e);
        }
        setTimeout(() => {
          setUploading(false);

          navigation.goBack();
        }, 1000);
      }
    }
  };

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
      let response = await addClientImage(result.uri, clientName, isClothImg);

      if (response) {
        try {
          clientImg = JSON.stringify(result.uri);

          await AsyncStorage.setItem("ClientImage", clientImg);
        } catch (e) {
          // saving error
          console.log(e);
        }
        setTimeout(() => {
          setUploading(false);

          navigation.goBack();
        }, 1000);
      }
    }
  };

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
            <Text
              style={{
                marginTop: width * 0.03,
              }}
            >
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              navigation.navigate("Gallery");
            }}
          >
            <Image
              source={require("../../assets/app.png")}
              style={{
                width: 35,
                height: 35,
                // height: height * 0.05,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                marginTop: width * 0.02,
              }}
            >
              Tailor Book
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={uploadFromGallery}
          >
            <FontAwesome name="photo" size={24} color="#8645FF" />
            <Text
              style={{
                marginTop: width * 0.03,
              }}
            >
              Photos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectPatternImage;

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
