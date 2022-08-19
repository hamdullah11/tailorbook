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
const { width, height } = Dimensions.get("window");
const kurtaSubImages = [
  {
    id: 1,
    image: require("../../assets/kurtaImages/kurta1.png"),
  },
  {
    id: 2,
    image: require("../../assets/kurtaImages/kurta2.png"),
  },
  {
    id: 3,
    image: require("../../assets/kurtaImages/kurta3.png"),
  },
  {
    id: 4,
    image: require("../../assets/kurtaImages/kurta4.png"),
  },
  {
    id: 5,
    image: require("../../assets/kurtaImages/kurta5.png"),
  },
  {
    id: 6,
    image: require("../../assets/kurtaImages/kurta6.png"),
  },
  {
    id: 7,
    image: require("../../assets/kurtaImages/kurta7.png"),
  },
];
const GallaryItems = [
  {
    id: 1,
    image: require("../../assets/Kurta.png"),
    name: "Kurta",
  },
  {
    id: 2,
    image: require("../../assets/Salwar.png"),
    name: "Salwar",
  },
  {
    id: 3,
    image: require("../../assets/Blouse.png"),
    name: "Blouse",
  },
  {
    id: 4,
    image: require("../../assets/Burka.png"),
    name: "Burka",
  },
  {
    id: 5,
    image: require("../../assets/Saree.png"),
    name: "Saree",
  },
  {
    id: 6,
    image: require("../../assets/UnderSkirt.png"),
    name: "Under Skirt",
  },
  {
    id: 7,
    image: require("../../assets/NightGown.png"),
    name: "Night Gown",
  },
  {
    id: 8,
    image: require("../../assets/frock.png"),
    name: "Frock",
  },
  {
    id: 9,
    image: require("../../assets/Churidar.png"),
    name: "Churidar",
  },
  {
    id: 10,
    image: require("../../assets/Shorts.png"),
    name: "Shorts",
  },
  {
    id: 11,
    image: require("../../assets/Jeans.png"),
    name: "Jeans",
  },
  {
    id: 12,
    image: require("../../assets/shirt.png"),
    name: "Shirt",
  },
  {
    id: 13,
    image: require("../../assets/pant.png"),
    name: "Pants",
  },
  {
    id: 14,
    image: require("../../assets/coat.png"),
    name: "Coat",
  },
  {
    id: 15,
    image: require("../../assets/Pajama.png"),
    name: "Pajama",
  },
  {
    id: 16,
    image: require("../../assets/ShalwarKameez.png"),
    name: "Shalwar Kameez",
  },
  // {
  //   id: 17,
  //   image: require("../../assets"),
  //   name: "Add New Folder",
  // },
];

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
                          itemId: 86,
                          otherParam: kurtaSubImages,
                          Type: item.name,
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
