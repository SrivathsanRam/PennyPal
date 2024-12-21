import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const languages = ['English', 'Mandarin', 'Malay', 'Tamil'];

export default function Onboarding1() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = async () => {
    if (selectedLanguage) {
      try {
        // Save the selected language to AsyncStorage
        await AsyncStorage.setItem('preferredLanguage', selectedLanguage);
        // Navigate to onboarding2.tsx
        router.push('/onboarding2');
      } catch (error) {
        console.error('Error saving language to AsyncStorage:', error);
      }
    } else {
      alert('Please select a language to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Preferred Language</Text>
      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language}
            style={[
              styles.languageButton,
              selectedLanguage === language && styles.selectedButton,
            ]}
            onPress={() => setSelectedLanguage(language)}
          >
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language && styles.selectedText,
              ]}
            >
              {language}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  languageButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
    margin: 10,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
