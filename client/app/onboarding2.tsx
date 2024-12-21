import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Onboarding2() {
  const [balance, setBalance] = useState('');
  const router = useRouter();

  const handleNext = async () => {
    if (balance) {
      try {
        // Save the balance to AsyncStorage
        await AsyncStorage.setItem('accountBalance', balance);
        // Navigate to the next screen (update with actual next page)
        router.push('/onboarding3'); // Update with the actual next route
      } catch (error) {
        console.error('Error saving balance to AsyncStorage:', error);
      }
    } else {
      alert('Please enter your account balance to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Current Account Balance</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Account Balance"
        value={balance}
        onChangeText={setBalance}
      />
      <Button title="Next" onPress={handleNext} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    paddingLeft: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
});
