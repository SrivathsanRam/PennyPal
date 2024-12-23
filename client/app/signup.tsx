import React, { useState } from "react";
import { View, Text, TextInput, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      console.log(JSON.stringify({ name, mobile_number: mobileNumber, password }))
      const response = await fetch("http://10.37.7.73:8000/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile_number: mobileNumber, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account created successfully");
        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem("userName", data.user.name);
        await AsyncStorage.setItem("userPhone", data.user.mobile_number);
        router.replace("/onboarding1");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to sign up");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to PennyPal</Text>
        <Image source={require('../assets/images/pennypal.png')} style={{ width: 200, height: 200 }} />
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            keyboardType="default"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Occupation"
            keyboardType="default"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="email-address"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
    
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={() => router.navigate("/signin")}>
            <Text style={styles.linkText}>Have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  linkText: {
    color: "#007bff",
    marginTop: 15,
  },
  welcome: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});