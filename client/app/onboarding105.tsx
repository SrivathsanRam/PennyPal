import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding105(){
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Image style={{ width: 200, height: 200 }} source={require('../assets/images/pennypal.png')} />
        <Text style={styles.title}>Welcome to PennyPal</Text>
        <Text style={styles.description}>
        Welcome to PennyPal where we turn your Penny into Profits! Get started by taking a short financial risk assessment questionnaire and get started on your journey to more financial independence with our personalised insights and tips.
        </Text>
        <Text style={styles.description}>
          Whether you're saving for the future, sending money back home, or just
          staying on top of your finances, PennyPal has got you covered.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding2')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background for aesthetics
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
    color: '#666',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#4CAF50', // Green color for call-to-action
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
