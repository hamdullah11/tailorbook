import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { Card, TextInput } from "react-native-paper";
const { width, height } = Dimensions.get("screen");
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
const GallaryItemsList = (item) => {
  return (
    <Card>
      <Image source={item.image} />
      <Text>{item}</Text>
    </Card>
  );
};
const NewClient = () => {
  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      <Card>
        <Card.Content>
          <View>
            <Tex></Tex>
          </View>
          {/* <TextInput
            placeholder="Client Name"
            right={<TextInput.Icon name="eye" />}
          /> */}
          <TextInput
            placeholder="Client Name"
            right={<TextInput.Icon name="eye" />}
          />
        </Card.Content>
      </Card>
      <FlatList
        data={GallaryItems}
        renderItem={({ item }) => GallaryItemsList(navigation, item)}
        keyExtractor={(item) => item.id}
        numColumns={2}
        horizontal={true}
      />
    </View>
  );
};

export default NewClient;

const styles = StyleSheet.create({});
