import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Card, Switch } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import ClientMeasurementDetails from "./ClientMeasurementDetails";
import PaymentStatus from "./PaymentStatus";
import SpecialInstructions from "./SpecialInstructions";
import RecordAudio from "./RecordAudio";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getMeasurementDetailsOfSelectedCloth from "../controllers/getMeasurementDetailsOfSelectedCloth";

const { width, height } = Dimensions.get("screen");

const AddClientDetails = ({ navigation, route }) => {
  // console.log(route.params.clientInfo);

  let { name, contactNo, clothType } = route.params.clientInfo;
  const clientInfo = route.params.clientInfo;
  //Client details
  const [clientDetails, setClientDetails] = useState({
    clientAddress: "",
    isUrgent: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRemindDatePicker, setShowRemindDatePicker] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [clientImageLink, setClientImageLink] = useState();
  const [clientClothImageLink, setClientClothImageLink] = useState();

  const [deliveryText, setDeliveryText] = useState("Set Date");
  const [remindText, setRemindText] = useState("Set Date");
  const [isMeasurementDressGiven, setisMeasurementDressGiven] = useState(false);
  const [measurementItems, setMeasurementItems] = useState();

  const [dates, setDates] = useState({
    deliveryDate: "",
    remindDate: "",
    markIsUrgent: false,
  });
  useEffect(() => {
    setClientDetails({ ...clientInfo });
  }, []);
  useEffect(() => {
    console.log(clientDetails);
  }, [clientDetails]);

  useEffect(() => {
    let measurementDetails = getMeasurementDetailsOfSelectedCloth(clothType);
    // console.log("focus", measurementDetails);

    setMeasurementItems(measurementDetails);
    navigation.addListener("focus", async () => {
      try {
        const ClientImage = await AsyncStorage.getItem("ClientImage");
        const ClientClothImage = await AsyncStorage.getItem("ClientClothImage");

        if (ClientImage !== null) {
          let index = ClientImage.indexOf('"');
          if (index !== -1) {
            const myArray = ClientImage.split('"');

            setClientImageLink(myArray[1]);
            // setClientDetails({
            //   ...clientDetails,
            //   ClientImage: myArray[1],
            // });
          }
        }
        if (ClientClothImage !== null) {
          let index = ClientClothImage.indexOf('"');
          if (index !== -1) {
            const myArray = ClientClothImage.split('"');

            console.log(myArray);

            setClientClothImageLink(myArray[1]);
            // setClientDetails({
            //   ...clientDetails,
            //   ClientClothImage: myArray[1],
            // });
          }
        }

        // value = await JSON.parse(value);
        // console.log("After", value);
        // setClientImageLink(value);
        try {
          await AsyncStorage.removeItem("ClientImage");
          await AsyncStorage.removeItem("ClientClothImage");
        } catch (exception) {
          console.log("error", exception);
        }
      } catch (e) {
        // error reading value
      }
    });
  }, [measurementItems, measurementItems]);

  const onChangeDeliveryDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type == "set") {
      selectedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        year: "full",
        month: "numeric",
        day: "numeric",
      });

      setDeliveryText(selectedDate);
      setDates({ ...dates, deliveryDate: selectedDate });
      setClientDetails({
        ...clientDetails,
        deliveryDate: selectedDate,
      });
    }
  };
  const onChangeRemindDate = (event, selectedDate) => {
    setShowRemindDatePicker(false);
    if (event.type == "set") {
      selectedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        year: "full",
        month: "numeric",
        day: "numeric",
      });

      setDates({ ...dates, remindDate: selectedDate });
      setRemindText(selectedDate);
      setClientDetails({
        ...clientDetails,
        remindDate: selectedDate,
      });
    }
  };
  return (
    <ScrollView
      style={{
        marginHorizontal: width * 0.03,
        marginVertical: width * 0.03,
      }}
    >
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={"date"}
          display="default"
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDeliveryDate}
        />
      )}
      {showRemindDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={"date"}
          display="default"
          value={new Date()}
          onChange={onChangeRemindDate}
          minimumDate={new Date()}
        />
      )}
      <Card>
        <Card.Content>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {clothType}
          </Text>
          <View
            style={{
              borderColor: "#eeeff4",
              borderBottomWidth: 1,
              width: width * 0.8,
              marginVertical: width * 0.03,
            }}
          ></View>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "#181059",
              }}
            >
              Cloth Images:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: width * 0.09,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UploadClientImage", {
                    clientName: name,
                  });
                }}
                style={{
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={width * 0.25}
                  source={
                    clientImageLink !== undefined
                      ? {
                          uri: clientImageLink,
                        }
                      : require("../../assets/clientImage.png")
                  }
                />
                <Text
                  style={{
                    color: "#868696",
                    marginVertical: width * 0.03,
                  }}
                >
                  Client Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UploadClientClothImg", {
                    clientName: name,
                  });
                }}
                style={{
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={width * 0.25}
                  source={
                    clientClothImageLink !== undefined
                      ? {
                          uri: clientClothImageLink,
                        }
                      : require("../../assets/cloths.png")
                  }
                />
                <Text
                  style={{
                    color: "#868696",
                    marginVertical: width * 0.03,
                  }}
                >
                  Cloth Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "#181059",
              }}
            >
              Pattern Images:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: width * 0.05,
              }}
            >
              <Card
                style={{
                  paddingHorizontal: width * 0.03,
                  paddingVertical: width * 0.03,
                }}
              >
                <Text style={{ color: "#868696", marginBottom: width * 0.03 }}>
                  Add New
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SelectPatternImage", {
                      userName: name,
                    });
                  }}
                  style={{
                    backgroundColor: "#C5C3D6",
                    padding: width * 0.06,
                    borderRadius: width * 0.02,
                  }}
                >
                  <Image source={require("../../assets/addNew.png")} />
                </TouchableOpacity>
              </Card>
              <Card
                style={{
                  paddingHorizontal: width * 0.03,
                  paddingVertical: width * 0.03,
                  marginLeft: width * 0.09,
                }}
              >
                <Text style={{ color: "#868696", marginBottom: width * 0.03 }}>
                  Pattern one
                </Text>
                <View
                  style={{
                    backgroundColor: "#C5C3D6",
                    padding: width * 0.06,
                    borderRadius: width * 0.02,
                  }}
                >
                  <Image
                    source={require("../../assets/pngaaa.com-1381294.png")}
                    style={{ width: 90 }}
                  />
                </View>
              </Card>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Card
        style={{
          marginTop: width * 0.09,
          paddingHorizontal: width * 0.07,
          paddingVertical: width * 0.07,
        }}
      >
        <Text style={{ color: "#181059", fontSize: 16 }}>Client Details:</Text>
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
            value={name}
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
          }}
        >
          <FontAwesome name="phone" size={24} color="#8645FF" />
          <TextInput
            placeholder="Client Contact"
            style={{
              backgroundColor: "#FFFFFF",
              marginHorizontal: width * 0.05,
            }}
            value={contactNo}
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
          }}
        >
          <Ionicons name="location" size={24} color="#8645FF" />
          <TextInput
            placeholder="Client Address"
            style={{
              backgroundColor: "#FFFFFF",
              marginHorizontal: width * 0.05,
            }}
            onChangeText={(address) => {
              setClientDetails({
                ...clientDetails,
                clientAddress: address,
              });
            }}
            value={clientDetails.clientAddress}
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
          <Feather name="hash" size={22} color="#8645FF" />
          <TouchableOpacity>
            <Feather name="info" size={24} color="#8645FF" />
          </TouchableOpacity>
        </View>
      </Card>
      <Card
        style={{
          marginTop: width * 0.09,
          paddingHorizontal: width * 0.07,
          paddingVertical: width * 0.07,
        }}
      >
        <Text
          style={{
            color: "#181059",
            fontSize: 16,
            marginVertical: width * 0.03,
          }}
        >
          Delivery Date:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: width * 0.02,
            paddingVertical: width * 0.03,
            // backgroundColor: "rgba(197,195,214,0.15)",
            borderColor: "#C5C3D6",
            borderWidth: 1,
            justifyContent: "space-between",
            borderRadius: width * 0.02,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              backgroundColor: "#FFFFFF",
              marginHorizontal: width * 0.05,
            }}
          >
            <Text>
              {dates.deliveryDate == "" ? deliveryText : dates.deliveryDate}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Image source={require("../../assets/calendar-date-fill.png")} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: "#181059",
            fontSize: 16,
            marginVertical: width * 0.03,
          }}
        >
          Remind Date
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: width * 0.02,
            paddingVertical: width * 0.03,
            borderColor: "#C5C3D6",
            borderWidth: 1,
            justifyContent: "space-between",
            borderRadius: width * 0.02,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowRemindDatePicker(true)}
            style={{
              backgroundColor: "#FFFFFF",
              marginHorizontal: width * 0.05,
            }}
          >
            <Text>
              {dates.remindDate == "" ? remindText : dates.remindDate}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Image source={require("../../assets/calendar-date-fill.png")} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: width * 0.03,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#2B2B2B", fontSize: 15 }}>Mark as Urgent</Text>
          <Switch
            value={clientDetails.isUrgent}
            onChange={() => {
              setClientDetails({
                ...clientDetails,
                isUrgent: !clientDetails.isUrgent,
              });
            }}
            color="#8645FF"
          />
        </View>
      </Card>
      <Card
        style={{
          marginTop: width * 0.09,
          paddingHorizontal: width * 0.07,
          paddingVertical: width * 0.07,
        }}
      >
        <Text
          style={{
            color: "#181059",
            fontSize: 16,
            marginVertical: width * 0.03,
          }}
        >
          Add Measurement:
        </Text>
        <View
          style={{
            marginVertical: width * 0.02,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#2B2B2B", fontSize: 13 }}>
            Measurement Dress Given?
          </Text>
          <Switch
            value={isMeasurementDressGiven}
            onChange={() => {
              setisMeasurementDressGiven(!isMeasurementDressGiven);
            }}
            color="#8645FF"
          />
        </View>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "#181059",
            fontSize: 16,
          }}
        >
          {clothType + ":"}
        </Text>
        {measurementItems && (
          <ClientMeasurementDetails item={measurementItems.details} />
        )}
      </Card>
      <PaymentStatus />
      <SpecialInstructions />
      <RecordAudio />
      <View
        style={{
          marginVertical: width * 0.2,
          marginHorizontal: width * 0.03,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          // onPress={() => navigation.navigate("Login", { name: "Jane" })}
        >
          <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddClientDetails;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#9B71E8",

    borderRadius: 3,
    padding: height * 0.027,
    marginHorizontal: width * 0.03,
    marginTop: height * 0.01,
  },
});
