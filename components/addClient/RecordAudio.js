import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useRef } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { Audio } from "expo-av";
import { Modal, NativeBaseProvider, Button } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const RecordAudio = () => {
  const [audio, setAudio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingStop, setIsRecordingStop] = useState(false);
  const [isAudioRecorded, setIsAudioRecorded] = useState(false);
  const [audioStatusText, setAudioStatusText] = useState("Press to Record");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [disableRecordingBtn, setDisableRecordingBtn] = useState(false);
  const [modalBtnText, setModalBtnText] = useState("Record Voice");
  const [modalBtnDisabler, setModalBtnDisabler] = useState(true);

  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());
  // const AudioPlayerStatus = await Audio

  const onPlaybackStatusUpdate = (obj) => {
    if (obj.didJustFinish) {
      setIsAudioPlaying(false);
    }
  };

  /**
   * Modal Save button Handler
   */

  const modalSaveBtnHandler = async () => {
    const recorderStatus = await AudioRecorder.current.getStatusAsync();
    console.log(recorderStatus);
    if (recorderStatus.isRecording) {
      stopRecording();
    } else {
      saveRecording();
    }
    // isRecording
    // ?
    // : isRecordingStop &&
  };

  /**
   * Play Recording
   */

  const playRecording = async () => {
    try {
      // Load the Recorded URI
      const playerStatus = await AudioPlayer.current.getStatusAsync();
      if (!playerStatus.isLoaded) {
        await AudioPlayer.current.loadAsync({ uri: audio }, {}, true);
      }

      // Get Player Status

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.replayAsync();
          AudioPlayer.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
          setIsAudioPlaying(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Pause Playing
   */
  const pauseAudio = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      setIsAudioPlaying(false);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Stop Recording
   */

  const stopRecording = async () => {
    setAudioStatusText("Recorded");
    setIsRecordingStop(true);
    try {
      // Stop recording

      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();

      setIsRecording(false);
      if (result) setAudio(result);
      setModalBtnText("Save");
      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
    } catch (error) {}
  };

  /**
   * Start Recording
   */

  const startRecording = async () => {
    setDisableRecordingBtn(true);

    setAudioStatusText("Recording");

    /**
     * Get Audio Recording Permission
     */
    let permission = await Audio.requestPermissionsAsync();
    if (permission.granted) {
      setIsRecording(true);
      setModalBtnText("Pause");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      await AudioRecorder.current.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      await AudioRecorder.current.startAsync();
      setModalBtnDisabler(false);
    }
  };

  /**
   *  Cancel
   */
  const Cancel = async () => {
    const recorderStatus = await AudioRecorder.current.getStatusAsync();
    console.log(recorderStatus);
    if (recorderStatus.isRecording) {
      await AudioRecorder.current.stopAndUnloadAsync();
      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();

      setAudio(undefined);
      setIsRecordingStop(true);
      setIsRecording(false);
      setDisableRecordingBtn(false);
    } else {
      setAudio(undefined);
      setDisableRecordingBtn(false);
    }
    console.log("cancel", isRecording);
    setShowModal(false);
    setAudioStatusText("Press To Record");
    setModalBtnText("Record Voice");
  };
  /**
   * Save Recording
   */
  const saveRecording = () => {
    setShowModal(false);
    if (audio) {
      ToastAndroid.showWithGravityAndOffset(
        "Recording Saved",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      setIsAudioRecorded(true);
      setModalBtnText("Record Voice");
      setModalBtnDisabler(true);
      setIsRecording(false);
      setIsRecordingStop(false);
      setAudioStatusText("Press to Record");
      setDisableRecordingBtn(false);
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "No Recording to save",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };

  /**
   *  Delete Audio
   */
  const deleteAudio = async () => {
    const audioStatus = await AudioPlayer.current.getStatusAsync();
    if (audioStatus.isPlaying) {
      await AudioPlayer.current.setStatusAsync({ shouldPlay: false });
    }
    if (audioStatus.isLoaded) {
      await AudioPlayer.current.unloadAsync();
      setAudio("");
      setIsAudioRecorded(false);
      setAudioStatusText("Press to Record");
    }

    // setIsRecording(!isRecording);
    // AudioRecorder.current = new Audio.Recording();
  };

  return (
    <View>
      <NativeBaseProvider>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Header>Record Audio</Modal.Header>
            <Modal.Body
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                disabled={disableRecordingBtn}
                style={{
                  backgroundColor: "black",
                  width: width * 0.2,
                  height: width * 0.2,
                  borderRadius: width * 0.1,
                  marginBottom: width * 0.02,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={startRecording}
              >
                {isRecording && (
                  <FontAwesome name="microphone" size={24} color="#8645FF" />
                )}
              </TouchableOpacity>
              <Text>{audioStatusText}</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={Cancel}>
                  Cancel
                </Button>
                <Button
                  disabled={modalBtnDisabler}
                  onPress={modalSaveBtnHandler}
                >
                  {modalBtnText}
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </NativeBaseProvider>

      <Card
        style={{
          marginTop: width * 0.09,
          paddingHorizontal: width * 0.07,
          paddingVertical: width * 0.07,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: width * 0.03,
          }}
        >
          <Text>Record Instructions Audio</Text>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
          >
            <FontAwesome name="microphone" size={25} color="#8645FF" />
          </TouchableOpacity>
        </View>
        {isAudioRecorded && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#DAD9E5",
              paddingVertical: width * 0.03,
              paddingHorizontal: width * 0.03,
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: width * 0.01,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  borderColor: "black",
                  borderWidth: 2,
                  borderRadius: 18,
                  padding: 5,
                }}
                onPress={isAudioPlaying ? pauseAudio : playRecording}
              >
                {isAudioPlaying ? (
                  <AntDesign name="pause" size={24} color="#1A293D" />
                ) : (
                  <AntDesign name="caretright" size={24} color="#1A293D" />
                )}
              </TouchableOpacity>
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#8645FF",
                  marginHorizontal: 3,
                }}
              ></View>
            </View>

            <TouchableOpacity onPress={deleteAudio}>
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </View>
  );
};

export default RecordAudio;

const styles = StyleSheet.create({});
