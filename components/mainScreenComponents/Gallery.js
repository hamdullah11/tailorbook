import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import getGalleryImages from "../../controllers/firebase/getImagesOfGallery";
import addNewGalleryFolder from "../controllers/addNewGalleryFolder";
import { HeaderTitle } from "react-navigation-stack";
import { ToastAndroid } from "react-native";
const { width, height } = Dimensions.get("window");

const GallaryItemsList = (navigation, item) => {
  return (
    <View
      style={{
        flex: 1,
        // alignItems: "center",
        width: 180,
        height: 180,
        marginHorizontal: width * 0.03,
      }}
    >
      <Card>
        {/* <Image source={item.image} />
         */}
        <Card.Cover source={item.image} />
        <Text style={{ textAlign: "center" }}>{item.name}</Text>
      </Card>
    </View>
  );
};
const Gallery = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [galleryImages, setGalleryImages] = useState();
  useEffect(() => {
    const getImagesOfGallery = async () => {
      let images = await getGalleryImages();

      setGalleryImages(images);
    };
    getImagesOfGallery();
  }, []);

  return (
    <ScrollView>
      {showModal && (
        <Modal animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.cardElementContainer}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.modalView}>
                <View>
                  <Text style={{ marginVertical: width * 0.01 }}>
                    Create a New Folder
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(name) => {
                      setFolderName(name);
                    }}
                    placeholder="Enter folder Name"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => {
                      if (folderName.length) {
                        addNewGalleryFolder(
                          folderName,
                          galleryImages,
                          setGalleryImages
                        );
                        setShowModal(false);
                      } else {
                        ToastAndroid.showWithGravityAndOffset(
                          "Folder name Cannot be empty",
                          ToastAndroid.LONG,
                          ToastAndroid.BOTTOM,
                          25,
                          50
                        );
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",

          marginVertical: height * 0.01,
          marginHorizontal: width * 0.03,
        }}
      >
        {galleryImages &&
          galleryImages.map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  width: width * 0.45,
                  height: width * 0.48,
                  backgroundColor: "white",
                  marginVertical: width * 0.02,
                  paddingVertical: height * 0.01,
                }}
              >
                <Card style={{ alignItems: "center" }}>
                  <Card.Content
                    style={{
                      width: width * 0.39,
                      height: width * 0.41,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(195, 197, 214, 0.3)",
                      // margin: 4,
                      elevation: 0,
                      borderWidth: 0,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("GallerySubTypes", {
                          item,
                          name: item.name,
                        })
                      }
                    >
                      {item.Imgurl ? (
                        <Image
                          source={{
                            uri: item.Imgurl,
                          }}
                          style={{
                            resizeMode: "contain",
                            width: width * 0.37,
                            height: width * 0.37,
                          }}
                        />
                      ) : (
                        <Image
                          source={require("../../assets/noSubitem.png")}
                          style={{
                            resizeMode: "contain",
                            width: width * 0.3,
                            height: width * 0.3,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </Card.Content>
                  <Text style={{ textAlign: "center" }}>{item.name}</Text>
                </Card>
              </View>
            );
          })}
        <View
          style={{
            width: width * 0.45,
            height: width * 0.48,
            backgroundColor: "white",
            marginVertical: width * 0.01,
            paddingVertical: height * 0.01,
          }}
        >
          <Card style={{ alignItems: "center" }}>
            <Card.Content
              style={{
                width: width * 0.39,
                height: width * 0.47,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(195, 197, 214, 0.3)",
                marginBottom: height * 0.01,
              }}
            >
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image
                  source={require("../../assets/kurtaImages/createfolder.png")}
                  style={{ resizeMode: "cover" }}
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    paddingHorizontal: width * 0.1,
    paddingVertical: width * 0.1,

    borderRadius: 5,
    padding: 5,
    alignItems: "flex-start",
  },
  cardElementContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    backgroundColor: "#8645FF",
    width: width * 0.3,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: width * 0.1,
    margin: 2,
    borderWidth: 1,
    padding: 5,
    width: width * 0.6,
    marginVertical: width * 0.02,
    borderRadius: width * 0.01,
  },
});
