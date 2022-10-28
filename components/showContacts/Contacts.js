import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Avatar, NativeBaseProvider } from "native-base";
import React, { useEffect, useState, useMemo } from "react";
import selectContactFromPhone from "../controllers/selectContactFromPhone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clipboard } from "react-native";
import { TouchableOpacity } from "react-native";
const { width, height } = Dimensions.get("screen");
const Contacts = ({ navigation }) => {
  const [storecontacts, setContacts] = useState([]);
  const [increment, setincrement] = useState(0);

  const colors = ["#22C55E", "#151E31", "#0F172A", "green.500", "yellow.500"];

  const selectColor = () => {
    if (increment == colors.length - 1) setincrement(0);

    setincrement(increment + 1);
  };

  useEffect(() => {
    const getContacts = async () => {
      let list = await selectContactFromPhone();
      if (list) {
        setContacts(list);
      } else {
        navigation.goBack();
      }
    };
    getContacts();
  }, []);
  const renderItem = (item) => {
    // console.log(item.item);
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginVertical: width * 0.03,
        }}
        onPress={async () => {
          await AsyncStorage.setItem(
            "clientNo",
            item.item.phoneNumbers[0].number
          );

          navigation.goBack();
        }}
      >
        <View
          style={{
            marginHorizontal: width * 0.1,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NativeBaseProvider>
            <Avatar bg={colors[increment]}>
              {item.item.name && item.item.name[0]}
            </Avatar>
          </NativeBaseProvider>
        </View>
        <View>
          <Text>{item.item.name && item.item.name}</Text>
          <Text>
            {item.item.phoneNumbers && item.item.phoneNumbers[0].number}
          </Text>
          <Text></Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    storecontacts && (
      <SafeAreaView>
        <FlatList
          data={storecontacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  );
};

export default Contacts;

const styles = StyleSheet.create({});
