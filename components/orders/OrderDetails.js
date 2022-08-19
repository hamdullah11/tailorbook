import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons, Feather, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const { width, height } = Dimensions.get("window");
const OrderDetails = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;

  return (
    <Card style={{ margin: width * 0.019 }}>
      <Card.Title
        title={otherParam.Type}
        style={{
          borderBottomColor: "#F5EBEB",
          borderBottomWidth: 1,
          marginHorizontal: 30,
          marginBottom: height * 0.02,
        }}
      />
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar.Image size={70} source={otherParam.image} />

        <Text style={{ color: "#2B2B2B", fontSize: 15 }}>
          {otherParam.Name}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#8645FF",
            padding: width * 0.02,
            borderRadius: width * 0.09,
          }}
        >
          <Feather name="phone-outgoing" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="chat" size={28} color="#181059" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#25D366",
            padding: width * 0.02,
            borderRadius: width * 0.09,
          }}
        >
          <FontAwesome5 name="whatsapp" size={25} color="white" />
        </TouchableOpacity>
      </Card.Content>
      <View
        style={{
          marginHorizontal: width * 0.06,
          marginVertical: width * 0.06,
        }}
      >
        <Text style={{ fontSize: 18, color: "#2B2B2B" }}>Order Date</Text>
        <TouchableOpacity
          style={{
            // backgroundColor: "#C5C3D6",
            borderColor: "#C5C3D6",
            borderWidth: 1,
            paddingHorizontal: width * 0.03,
            paddingVertical: width * 0.05,
            borderRadius: width * 0.02,
            marginVertical: width * 0.03,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>May 12, 2022</Text>
            <Feather name="edit-3" size={24} color="#8645FF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: "#C5C3D6",
            // borderWidth: 1,
            paddingHorizontal: width * 0.03,
            paddingVertical: width * 0.05,
            borderRadius: width * 0.02,
            marginVertical: width * 0.001,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#2B2B2B" }}>
              Order Status:
            </Text>
            <Text style={{ fontSize: 16, color: "#2B2B2B" }}>Received</Text>

            <Feather name="edit-3" size={24} color="#8645FF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: "#C5C3D6",
            // borderWidth: 1,
            paddingHorizontal: width * 0.03,
            paddingVertical: width * 0.05,
            borderRadius: width * 0.02,
            marginVertical: width * 0.001,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#2B2B2B" }}>
              Edit Measurement
            </Text>

            <Feather name="edit-3" size={24} color="#8645FF" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: width * 0.1,
            marginVertical: height * 0.03,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#8645FF",
              paddingHorizontal: height * 0.07,
              paddingVertical: height * 0.02,
              borderRadius: width * 0.1,
            }}
          >
            <Text style={{ color: "#FFFFFF" }}>View Bill</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
