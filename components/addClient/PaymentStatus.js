import { StyleSheet, Text, View, Dimensions } from "react-native";
import { React, useEffect, useState } from "react";
import { Card, TextInput } from "react-native-paper";
const { width, height } = Dimensions.get("screen");

const PaymentStatus = () => {
  const [paymentStatus, setPaymentStatus] = useState({
    totalAmount: 900,
    advanceAmount: 0,
    dueAmount: 900,
  });
  let dueAmount = 0;

  const changeTotalAmount = () => {
    if (paymentStatus.advanceAmount > 0) {
      dueAmount = paymentStatus.totalAmount - paymentStatus.advanceAmount;
    } else {
      dueAmount = paymentStatus.totalAmount;
    }
    setPaymentStatus({
      ...paymentStatus,

      dueAmount: dueAmount,
    });
    console.log(paymentStatus);
  };
  const changeAdvanceAmount = () => {
    console.log(dueAmount, paymentStatus.advanceAmount);
    if (paymentStatus.advanceAmount > 0) {
      dueAmount = paymentStatus.totalAmount - paymentStatus.advanceAmount;
    }
    setPaymentStatus({
      ...paymentStatus,

      dueAmount: dueAmount,
    });
  };

  return (
    <View>
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
          }}
        >
          Payment Status
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: width * 0.04,
          }}
        >
          <Text style={{ color: "#2B2B2B" }}>Total amount</Text>
          <TextInput
            placeholder="00"
            outlineColor="red"
            activeOutlineColor="red"
            style={{ backgroundColor: "#FFFFFF", height: height * 0.02 }}
            keyboardType="number-pad"
            onChangeText={(text) => {
              setPaymentStatus({
                ...paymentStatus,
                totalAmount: text,
              });
            }}
            value={paymentStatus.totalAmount.toString()}
            onEndEditing={changeTotalAmount}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: width * 0.04,
          }}
        >
          <Text style={{ color: "#2B2B2B" }}>Advanced Amount</Text>
          <TextInput
            placeholder="00"
            outlineColor="red"
            activeOutlineColor="red"
            style={{ backgroundColor: "#FFFFFF", height: height * 0.02 }}
            keyboardType="number-pad"
            onChangeText={(text) => {
              setPaymentStatus({
                ...paymentStatus,
                advanceAmount: text,
              });
            }}
            onEndEditing={changeAdvanceAmount}
            value={paymentStatus.advanceAmount.toString()}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: width * 0.04,
          }}
        >
          <Text style={{ color: "#2B2B2B" }}>Due Amount</Text>
          <TextInput
            placeholder="00"
            outlineColor="red"
            activeOutlineColor="red"
            style={{ backgroundColor: "#FFFFFF", height: height * 0.02 }}
            value={paymentStatus.dueAmount.toString()}
          />
        </View>
      </Card>
    </View>
  );
};

export default PaymentStatus;

const styles = StyleSheet.create({});
