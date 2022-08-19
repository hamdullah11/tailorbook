import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  Clipboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, RadioButton, Avatar } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import selectContactFromPhone from "../../controllers/selectContactFromPhone";
import uploadNewDressItem from "../controllers/uploadNewDressItem";
import getSliderImages from "../../controllers/firebase/getSliderImages";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";

const { width, height } = Dimensions.get("screen");
const GallaryItems = [
  {
    id: 1,
    image: require("../../assets/horizontalScroll/shirt.png"),
    name: "Shirt",
  },
  {
    id: 2,
    image: require("../../assets/horizontalScroll/salwar.png"),
    name: "Salwar",
  },
  {
    id: 3,
    image: require("../../assets/horizontalScroll/blouse.png"),
    name: "Blouse",
  },

  {
    id: 5,
    image: require("../../assets/horizontalScroll/saree.png"),
    name: "Saree",
  },
  {
    id: 6,
    image: require("../../assets/horizontalScroll/UnderSkirt.png"),
    name: "Under Skirt",
  },
  {
    id: 7,
    image: require("../../assets/horizontalScroll/nightgown.png"),
    name: "Night Gown",
  },
  {
    id: 8,
    image: require("../../assets/horizontalScroll/frock.png"),
    name: "Frock",
  },
  {
    id: 9,
    image: require("../../assets/horizontalScroll/Churidar.png"),
    name: "Churidar",
  },
  {
    id: 10,
    image: require("../../assets/horizontalScroll/shorts.png"),
    name: "Shorts",
  },
  {
    id: 11,
    image: require("../../assets/horizontalScroll/jeans.png"),
    name: "Jeans",
  },
  {
    id: 12,
    image: require("../../assets/horizontalScroll/burka.png"),
    name: "Burka",
  },
  {
    id: 13,
    image: require("../../assets/horizontalScroll/pant.png"),
    name: "Pants",
  },
  {
    id: 14,
    image: require("../../assets/horizontalScroll/coat.png"),
    name: "Coat",
  },
  {
    id: 15,
    image: require("../../assets/horizontalScroll/Pajama.png"),
    name: "Pajama",
  },
  {
    id: 16,
    image: require("../../assets/horizontalScroll/ShalwarKameez.png"),
    name: "Shalwar Kameez",
  },
];
import {
  Center,
  Modal,
  NativeBaseProvider,
  Button,
  FormControl,
  Input,
} from "native-base";

const GalleryItemsList = (item, setItemId, itemId, setItemName) => {
  let selected = itemId == item.id;
  // console.log(item);

  return (
    <TouchableOpacity
      onPress={() => {
        setItemId(item.id);
        // console.log(item);
        setItemName(item.name);
      }}
    >
      <Card
        style={[
          styles.cardStyle,
          selected == true ? styles.selectedCardStyle : "",
        ]}
      >
        <View style={{ alignItems: "center", justifyContent: "space-between" }}>
          {selected && (
            <Ionicons
              name="checkmark-circle"
              size={30}
              color="#8645FF"
              style={{
                position: "absolute",
                top: 50,
                elevation: 4,
                zIndex: 100,
              }}
            />
          )}
          <View
            style={{
              backgroundColor: "rgba(200,198,217,0.20)",
              borderRadius: width * 0.1,
              width: width * 0.2,
              height: width * 0.2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "cover",
              }}
              source={{
                uri: item.Imgurl,
              }}
            />
          </View>
          <Text
            style={{ fontSize: 16, marginTop: width * 0.05, color: "#2B2B2B" }}
          >
            {item.name}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const AddClient = ({ navigation }) => {
  const [checked, setChecked] = React.useState("first");
  const [itemId, setItemId] = useState();
  const [contactsCLicked, setcontactsCLicked] = useState(false);
  const [images, setImages] = useState([]);
  const [clothName, setClothName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    name: "",
    contactNo: "",
    gender: "Male",
    clothType: "",
  });
  if (contactsCLicked) {
    navigation.addListener("focus", async () => {
      let number = await AsyncStorage.getItem("clientNo");
      if (number) {
        setClientInfo({
          ...clientInfo,
          contactNo: number,
        });
      }
    });
  }

  const addDress = () => {
    if (clothName) {
      setShowModal(false);
      navigation.navigate("UploadDressItem", { clothName: clothName });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Dress Name can not be empty!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  const [itemName, setItemName] = useState("");
  useEffect(() => {
    setClientInfo({
      ...clientInfo,
      clothType: itemName,
    });
  }, [itemName]);

  /// Getting data from firebase
  useEffect(() => {
    let galleryImages = [];
    const getImages = async () => {
      const storage = getStorage();
      const reference = ref(storage, "clothTypes");
      let allImageRef = await listAll(reference);
      if (allImageRef.items.length) {
        for (let i = 0; i < allImageRef.items.length; i++) {
          let url = await getDownloadURL(allImageRef.items[i]);
          let metaData = await getMetadata(allImageRef.items[i]);
          let name = metaData.name.split(".");
          galleryImages.push({
            id: i,
            Imgurl: url,
            name: name[0],
          });
        }
        setImages(galleryImages);
      }
    };
    getImages();
  }, []);

  return (
    <ScrollView
      style={{
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.04,
      }}
    >
      <View>
        <NativeBaseProvider>
          <Center>
            {/* <Button onPress={() => setShowModal(true)}>Button</Button> */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Body>
                  <View
                    style={{
                      marginVertical: width * 0.07,
                    }}
                  >
                    <Text
                      style={{
                        marginVertical: width * 0.03,
                      }}
                    >
                      Enter cloth Name
                    </Text>
                    <TextInput
                      placeholder="Shirt"
                      style={{
                        borderWidth: 1,
                        backgroundColor: "#FBFBFB",
                        borderColor: "rgba(28,55,90,0.16)",
                        borderRadius: 4,
                        padding: 3,
                      }}
                      value={clothName}
                      onChangeText={(text) => {
                        setClothName(text);
                      }}
                    />
                  </View>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setShowModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button backgroundColor={"#8645FF"} onPress={addDress}>
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </Center>
        </NativeBaseProvider>
      </View>
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "rgba(28,55,90,0.16)",
              borderBottomWidth: 1,
              alignItems: "center",
              paddingHorizontal: width * 0.02,
              paddingVertical: width * 0.04,
            }}
          >
            <FontAwesome name="user" size={24} color="#8645FF" />
            <TextInput
              placeholder="Client Name"
              style={{
                backgroundColor: "#FFFFFF",
                marginHorizontal: width * 0.05,
              }}
              onChangeText={(name) => {
                setClientInfo({
                  ...clientInfo,
                  name: name,
                });
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "rgba(28,55,90,0.16)",
              borderBottomWidth: 1,
              alignItems: "center",
              paddingHorizontal: width * 0.02,
              paddingVertical: width * 0.04,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome name="phone" size={24} color="#8645FF" />
              <TextInput
                placeholder="Phone Number"
                style={{
                  backgroundColor: "#FFFFFF",
                  marginHorizontal: width * 0.05,
                }}
                onChangeText={(number) => {
                  setClientInfo({
                    ...clientInfo,
                    contactNo: number,
                  });
                }}
                value={clientInfo.contactNo}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setcontactsCLicked(true);
                  navigation.navigate("Contacts");
                }}
              >
                <Image source={require("../../assets/phonebookalt.png")} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginVertical: height * 0.04,
            }}
          >
            <Text style={{ color: "#2B2B2B", fontSize: 16 }}>
              Select Gender:
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: width * 0.04,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RadioButton
                  value="Male"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked("first");
                    setClientInfo({
                      ...clientInfo,
                      gender: "Male",
                    });
                  }}
                  color="#8645FF"
                  uncheckedColor="#8645FF"
                />
                <Text style={{ fontSize: 18, color: "#2B2B2B" }}> Male</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RadioButton
                  color="#8645FF"
                  uncheckedColor="#8645FF"
                  value="Female"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked("second");
                    setClientInfo({
                      ...clientInfo,
                      gender: "Female",
                    });
                  }}
                />
                <Text style={{ fontSize: 18, color: "#2B2B2B" }}> Female</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
      {images && (
        <FlatList
          data={images}
          renderItem={({ item }) =>
            GalleryItemsList(item, setItemId, itemId, setItemName)
          }
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      )}

      <View style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#2B2B2B" }}>
          Can't find the item you are looking for?
        </Text>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          // onPress={uploadNewDressItem}
        >
          <Text
            style={{
              color: "#8645FF",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            Add A New Dress Item
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (itemId) {
              navigation.navigate("AddNewClientDetails", {
                clientInfo: clientInfo,
              });
            } else {
              ToastAndroid.showWithGravityAndOffset(
                "Please Select A Dress",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
              );
            }
          }}
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#9B71E8",

    borderRadius: 3,
    padding: height * 0.016,
    // marginHorizontal: width * 1,
    width: width * 0.5,
    marginTop: height * 0.02,
  },
  cardStyle: {
    marginHorizontal: 2,
    marginVertical: 10,
    padding: width * 0.09,
  },
  selectedCardStyle: {
    borderWidth: 2,
    borderColor: "#8645FF",
  },
});
