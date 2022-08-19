import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
// import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
const renderItem = (img) => {
  return (
    <Image
      source={{
        uri: img.item,
      }}
      key={img.index}
      style={{ width: width * 0.8, height: height * 0.6 }}
    />
  );
};
const GallerySubTypesSlider = ({ route }) => {
  // console.log("slider", route.params);
  let { Images } = route.params;
  const [image, setImage] = useState(Images[0]);
  const [currentPosition, setCurrentPosition] = useState(0);

  const changeImage = () => {
    if (currentPosition < Images.length) {
      setCurrentPosition(currentPosition + 1);
      setImage(Images[currentPosition]);
    }
    if (currentPosition == Images.length) {
      setCurrentPosition(0);
      setImage(Images[0]);
    }
  };
  return (
    <ScrollView onTouchEnd={(e) => changeImage(e)}>
      <View style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: width,
            height: height * 0.5,

            resizeMode: "cover",
            marginTop: width * 0.5,
          }}
        />
      </View>

      {/* <FlatList
        data={Images}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
      {/* <SliderBox
        resizeMode={"cover"}
        images={Images}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "97%",

          //   marginTop: 100,
        }}
      /> */}
    </ScrollView>
  );
};

export default GallerySubTypesSlider;
const styles = StyleSheet.create({
  container: {
    // flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
