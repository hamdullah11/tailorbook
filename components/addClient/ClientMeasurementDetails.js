import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton, TextInput } from "react-native-paper";

const { height, width } = Dimensions.get("screen");
const ClientMeasurementDetails = (measurementDetails) => {
  const [checked, setChecked] = useState("checked");
  const [measurement, setMeasurement] = useState({});

  console.log("kkk", item);
  useEffect(() => {
    // console.log(measurement);
  }, [measurement]);

  return (
    <View></View>
    // <>
    //   {item?.type == "ShalwarKameez" ? (
    //     <View></View>
    //   ) : (
    //     item &&
    //     item.map((single, i) => {
    //       return (
    //         <View
    //           key={i}
    //           style={{
    //             flexDirection: "row",
    //             justifyContent: "space-between",
    //             marginVertical: width * 0.03,
    //             alignItems: "center",
    //           }}
    //         >
    //           <Text
    //             style={{
    //               flex: 1 / 2,
    //             }}
    //           >
    //             {single}
    //           </Text>
    //           <View style={{}}>
    //             <TextInput
    //               placeholder="00"
    //               outlineColor="red"
    //               activeOutlineColor="red"
    //               keyboardType="number-pad"
    //               style={{
    //                 backgroundColor: "#FFFFFF",
    //                 height: height * 0.02,
    //               }}
    //               onChangeText={(text) => {
    //                 let new_obj = { ...measurement };
    //                 new_obj[single] = text;
    //                 setMeasurement({ ...new_obj });
    //               }}
    //             />
    //           </View>
    //           <View
    //             style={{
    //               borderColor: "#2B2B2B",
    //               borderWidth: 1,

    //               width: width * 0.03,
    //               height: width * 0.03,
    //               borderRadius: width * 0.015,
    //             }}
    //           ></View>
    //           <Text style={{}}>inc</Text>
    //         </View>
    //       );
    //     })
    //   )}
    // </>
  );
};

export default ClientMeasurementDetails;
