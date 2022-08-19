import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import React from "react";
const { width, height } = Dimensions.get("window");

const activeOrders = [
  {
    image: require("../../assets/cardImage.png"),
    Name: "Zakir Ullah",
    Type: "Salwar Kameez #1",
    moneyStatus: "Received",
    totalAmount: "Rs 600 (1 item)",
    Date: "Due On May, 20, 2022",
    id: 1,
  },
  {
    image: require("../../assets/cardImage.png"),
    Name: "Zakir Ullah",
    Type: "Salwar Kameez #1",
    moneyStatus: "Received",
    totalAmount: "Rs 600 (1 item)",
    Date: "Due On May, 20, 2022",
    id: 2,
  },
  {
    image: require("../../assets/cardImage.png"),
    Name: "Zakir Ullah",
    Type: "Salwar Kameez #1",
    moneyStatus: "Received",
    totalAmount: "Rs 600 (1 item)",
    Date: "Due On May, 20, 2022",
    id: 3,
  },
];
const ActiveOrdersCard = (navigation, item) => {
  return (
    <Card style={{ margin: width * 0.019 }}>
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar.Image size={100} source={item.image} />
        <View>
          <Text style={{ color: "#2B2B2B", fontSize: 15 }}>{item.Name}</Text>
          <Text style={{ color: "#2B2B2B", fontSize: 10 }}>{item.Type}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#8645FF",
                width: 10,
                height: 10,
                borderRadius: 10,
                marginRight: 5,
              }}
            ></View>
            <Text style={{ color: "#2B2B2B", fontSize: 10 }}>
              {item.moneyStatus}
            </Text>
          </View>

          <Text style={{ color: "#2B2B2B", fontSize: 10 }}>
            {item.totalAmount}
          </Text>
          <Text style={{ color: "#2B2B2B", fontSize: 10 }}>{item.Date}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#8645FF",
            padding: height * 0.02,
            borderRadius: height * 0.2,
          }}
          onPress={() =>
            navigation.navigate("OrderDetails", {
              itemId: 86,
              otherParam: item,
            })
          }
        >
          <Text style={{ color: "#FFFFFF" }}>View</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const Active = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //   <Image source={require("../../assets/homeScreen.png")} />
    //   <Text style={{ color: "#060416", fontSize: 18 }}>
    //     Welcome to Tailor book!
    //   </Text>
    //   <Text style={{ color: "#8C88AC", fontSize: 12 }}>
    //     No clients added yet get started by adding a client.
    //   </Text>
    // </View>
    <FlatList
      data={activeOrders}
      renderItem={({ item }) => ActiveOrdersCard(navigation, item)}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Active;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
