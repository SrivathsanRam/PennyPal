import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Profile() {
  const [quizScore, setQuizScore] = useState<number>(2); // Default placeholder value
  const [riskLevel, setRiskLevel] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<number>(600);
  const [monthlyRemittance, setMonthlyRemittance] = useState<number>(250);
  const [monthlySavings, setMonthlySavings] = useState<number>(150);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedIncome = await AsyncStorage.getItem("monthlyIncome");
        const storedRemittance = await AsyncStorage.getItem(
          "monthlyRemittance"
        );
        const storedSavings = await AsyncStorage.getItem("monthlySavings");
        const storedScore = await AsyncStorage.getItem(
          "financialLiteracyScore"
        );

        if (storedName) setUserName(storedName);
        if (storedIncome) setMonthlyIncome(Number(storedIncome));
        if (storedRemittance) setMonthlyRemittance(Number(storedRemittance));
        if (storedSavings) setMonthlySavings(Number(storedSavings));
        if (storedScore) setQuizScore(Number(storedScore) || 2); // Default to 2 if null
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const submitData = async () => {
      try {
        console.log(
          JSON.stringify({
            quizScore,
            monthlyIncome,
            monthlyRemittance,
            monthlySavings,
          })
        );
        const response = await fetch("http://10.37.7.73:8000/api/risk/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizScore,
            monthlyIncome,
            monthlyRemittance,
            monthlySavings,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          const riskMapping = ["Low Risk", "Medium Risk", "High Risk"];
          setRiskLevel(riskMapping[data.riskLevel] || "Unknown Risk");
        } else {
          Alert.alert(
            "Error",
            data.message || "Failed to calculate risk level"
          );
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };

    submitData();
  }, [quizScore, monthlyIncome, monthlyRemittance, monthlySavings]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/signin");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <FontAwesome
        name="user-circle-o"
        size={100}
        color="#163735"
        style={styles.profileIcon}
      />
      {/* User Name */}
      <Text style={styles.userName}>Welcome {userName || "User"}!</Text>

      {/* Risk Level Bubble */}
      {riskLevel && (
        <View style={styles.imageContainer}>
          <Image
            source={
              riskLevel === "Low Risk"
                ? require("../../assets/images/low risk.png") // Replace with actual path to image1
                : riskLevel === "Medium Risk"
                ? require("../../assets/images/med.jpg") // Replace with actual path to image2
                : require("../../assets/images/high.jpg") // Replace with actual path to image3
            }
            style={styles.image}
          />
          <Text style={styles.riskText}>
            {riskLevel === "Low Risk"
              ? "You're doing great! Keep it up!"
              : riskLevel === "Medium Risk"
              ? "At risk, consider reviewing your finances."
              : "Take care! High risk detected, seek advice!"}
          </Text>
          <Text style={styles.suggestionText}>
            Suggestions:
          </Text>
          <View style={styles.suggestionList}>
          
        {["Spend Less Money", "Save More Money", "Improve Financial Literacy"].map((item, index) => (
          <Text key={index} style={styles.suggestionItem}>
            {`${index + 1}. ${item}`}
          </Text>
        ))}
      </View>
        </View>
      )}

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  suggestionList: {
    marginTop: 10,
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  suggestionItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileIcon: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    width: 150, // Adjust the width of the image
    height: 160, // Adjust the height of the image
    marginBottom: 10,
  },
  riskBubble: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  riskText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  suggestionText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginTop:10,
  },
  logoutButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
