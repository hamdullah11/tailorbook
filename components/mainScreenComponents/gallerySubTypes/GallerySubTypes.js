import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Title } from "react-native-paper";
import getGallerySubImages from "../../../controllers/firebase/getGallerySubImages";
import { Modal, NativeBaseProvider, Center } from "native-base";
const { width, height } = Dimensions.get("window");
const GallerySubTypes = ({ route, navigation }) => {
  const { itemId, otherParam, Type } = route.params;
  const [Images, setImages] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      let gallerySubImages = await getGallerySubImages(Type);

      setImages(gallerySubImages);
      setLoader(false);
    };
    getImages();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginVertical: height * 0.01,
        }}
      >
        {loader ? (
          <NativeBaseProvider>
            <Center>
              <Modal isOpen={loader}>
                <Modal.Content maxWidth="400px">
                  <Modal.Header>Fetching Pictures</Modal.Header>
                  <Modal.Body>
                    <ActivityIndicator size={"small"} color="gray" />
                    <Text>Please wait...</Text>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </Center>
          </NativeBaseProvider>
        ) : (
          <>
            {Images.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("GallerySubTypesSlider", {
                    Images: Images,
                  });
                }}
                key={i}
                style={{
                  width: width * 0.45,
                  height: width * 0.48,
                  //   backgroundColor: "white",
                  marginVertical: width * 0.04,
                  paddingVertical: height * 0.01,
                }}
              >
                <Card>
                  <Card.Cover source={{ uri: item }} />
                </Card>
              </TouchableOpacity>
            ))}
            <Card
              style={{
                width: width * 0.45,
                height: width * 0.54,
                // backgroundColor: "white",
                marginVertical: width * 0.06,
                paddingVertical: height * 0.01,
                elevation: 0,
                // opacity: 0.5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UploadDressItem");
                }}
              >
                <Card.Content>
                  <Text style={{ color: "#868696" }}>Add Custom</Text>
                </Card.Content>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: width * 0.05,
                  }}
                >
                  <Image source={require("../../../assets/addNew.png")} />
                </View>
              </TouchableOpacity>
            </Card>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default GallerySubTypes;

const styles = StyleSheet.create({});
