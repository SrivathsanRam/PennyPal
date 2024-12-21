import React, { useState } from 'react';
import { View, Button, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';

export default function Home() {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [editableText, setEditableText] = useState("");

  // Dummy function for starting speech recognition (mock functionality)
  const handleStart = async () => {
    setRecognizing(true);
    setTranscript(""); // Clear any previous text when starting
    setEditableText(""); // Clear editable text when starting
  };

  // Dummy function for stopping speech recognition
  const handleStop = () => {
    setRecognizing(false);
    // Simulate speech recognition result (mock output)
    setTranscript("I spent 5 dollars on food");
    setEditableText("I spent 5 dollars on food"); // Pre-fill editable text with the mock output
  };

  // Dummy function for submitting the form (mock transaction submission)
  const handleSubmit = () => {
    const transaction = editableText; // Get the text from the input
    console.log("Submitted Text:", transaction);
    Alert.alert("Text Submitted", "Transaction recorded successfully.");
  };

  return (
    <View style={styles.container}>
      {!recognizing ? (
        <Button title="Start Speech Recognition" onPress={handleStart} />
      ) : (
        <Button title="Stop Speech Recognition" onPress={handleStop} />
      )}

      <ScrollView>
        {/* Display the recognized text only when stopped */}
        {!recognizing && (
          <>
            <Text style={styles.label}>Recognized Text:</Text>
            <Text style={styles.transcript}>{transcript}</Text>
          </>
        )}

        <Text style={styles.label}>Edit Text:</Text>
        <TextInput
          style={styles.textInput}
          value={editableText}
          onChangeText={setEditableText}
          multiline
        />

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  transcript: {
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textInput: {
    fontSize: 16,
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 100,
  },
});
