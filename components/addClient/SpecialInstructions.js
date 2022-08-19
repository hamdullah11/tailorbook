import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useState } from "react";
import { Card, TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("screen");

const SpecialInstructions = () => {
  const [specialInstructions, setSpecialInstructions] = useState();

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
            marginBottom: width * 0.02,
          }}
        >
          Special Intructions
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          underlineColor="transparent"
          //   activeunderlineColor="transparent"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C5C3D6",
            borderWidth: 1,
          }}
          onChangeText={(text) => {
            setSpecialInstructions(text);
          }}
        />
      </Card>
    </View>
  );
};

export default SpecialInstructions;

const styles = StyleSheet.create({});
