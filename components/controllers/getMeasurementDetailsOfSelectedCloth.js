import { View, Text } from "react-native";
import React from "react";
import { AllMeasurements } from "../../measurements/AllMeasurements";
const getMeasurementDetailsOfSelectedCloth = (clothType) => {
  if (clothType == "") return;

  let item = AllMeasurements.find((item) => {
    if (item.type == clothType) {
      return item;
    }
  });

  return item;
};

export default getMeasurementDetailsOfSelectedCloth;
