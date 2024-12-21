import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState("");
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const scale = new Animated.Value(1);

  // Pulse animation
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    scale.stopAnimation();
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert("Microphone permission is required.");
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      startPulseAnimation();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        stopPulseAnimation();
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) {
          sendAudioToBackend(uri);
        }
        setRecording(null);
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const sendAudioToBackend = async (uri: string) => {
    try {
      const audioData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch("http://192.168.0.106:8000/api/transcribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: audioData }),
      });

      const data = await response.json();
      setTranscribedText(data.transcription || "Error in transcription");
    } catch (error) {
      console.error("Error sending audio to backend:", error);
    }
  };

  const submitTranscription = async () => {
    try {
      const response = await fetch("http://192.168.0.106:8000/api/classify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcribedText }),
      });

      const data = await response.json();
      setTransactionDetails(data);
    } catch (error) {
      console.error("Error submitting transcription:", error);
    }
  };

  const handleConfirmTransaction = async () => {
    try {
      transactionDetails['mobile_number'] = "91159829";
      console.log(JSON.stringify(transactionDetails));
      const response = await fetch("http://192.168.0.106:8000/api/add_transaction/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionDetails),
      });

      if (response.ok) {
        setTransactionDetails(null);
        setShowModal(true);
      } else {
        alert("Failed to add transaction.");
      }
    } catch (error) {
      console.error("Error confirming transaction:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={styles.micContainer}
      >
        <Animated.View
          style={[
            styles.ripple,
            { transform: [{ scale: scale }] },
            isRecording && styles.rippleActive,
          ]}
        />
        <FontAwesome name="microphone" size={50} color="white" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Transcription will appear here..."
        value={transcribedText}
        onChangeText={setTranscribedText}
        multiline
      />
      <TouchableOpacity onPress={submitTranscription} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      {transactionDetails && (
        <View style={styles.transactionContainer}>
          <Text>Transaction Type: {transactionDetails.type}</Text>
          <Text>Category: {transactionDetails.category}</Text>
          <Text>Amount: ${transactionDetails.amount}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => setTransactionDetails(null)}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Text style={styles.actionText}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmTransaction}
              style={[styles.actionButton, styles.confirmButton]}
            >
              <Text style={styles.actionText}>✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Successfully added transaction!</Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeModalButton}
            >
              <Text style={styles.closeModalText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  micContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  ripple: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "red",
    opacity: 0.5,
  },
  rippleActive: {
    opacity: 0.3,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
  },
  actionText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeModalText: {
    color: "white",
    fontSize: 16,
  },
});
