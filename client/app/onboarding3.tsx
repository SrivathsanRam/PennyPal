import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';

export default function Onboarding3() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
  });

  const router = useRouter();

  // Define the correct answers for the quiz
  const correctAnswers = {
    question1: 'Something that makes money',
    question2: 'Interest on both the principal and the interest',
    question3: 'All of the above',
    question4: 'A score that determines your creditworthiness',
  };

  // Questions for the quiz
  const questions = [
    {
      question: 'What is an asset?',
      options: ['Something that makes money', 'Something that loses money', 'A liability', 'None of the above'],
      key: 'question1',
    },
    {
      question: 'What is compound interest?',
      options: ['Interest on the principal only', 'Interest on both the principal and the interest', 'Fixed interest on loans', 'None of the above'],
      key: 'question2',
    },
    {
      question: 'What is the purpose of a budget?',
      options: ['To control spending', 'To save money', 'To track expenses', 'All of the above'],
      key: 'question3',
    },
    {
      question: 'What is a credit score?',
      options: ['A measure of how much money you owe', 'A measure of your spending habits', 'A score that determines your creditworthiness', 'None of the above'],
      key: 'question4',
    },
  ];

  // Handle change of answer for a question
  const handleAnswerChange = (questionKey: string, value: string) => {
    setAnswers({ ...answers, [questionKey]: value });
  };

  // Handle quiz submission and calculate score
  const handleSubmit = async () => {
    if (
      !answers.question1 ||
      !answers.question2 ||
      !answers.question3 ||
      !answers.question4
    ) {
      Alert.alert('Error', 'Please answer all the questions to proceed.');
      return;
    }

    // Calculate the score based on correct answers
    let score = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key] === correctAnswers[key]) {
        score++;
      }
    });

    try {
      // Store the score in AsyncStorage
      await AsyncStorage.setItem('financialLiteracyScore', score.toString());

      // Redirect to the (tabs) screen after quiz submission
      router.push('/(tabs)'); // Update with your actual tabs route
    } catch (error) {
      console.error('Error saving score to AsyncStorage:', error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
        
      <Text style={styles.title}>Financial Literacy Quiz</Text>

      {/* Loop through the questions and display them */}
      {questions.map((q, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{q.question}</Text>
          {q.options.map((option, idx) => (
            <View key={idx} style={styles.radioButtonContainer}>
              <RadioButton
                value={option}
                status={answers[q.key] === option ? 'checked' : 'unchecked'}
                onPress={() => handleAnswerChange(q.key, option)}
              />
              <Text style={styles.option}>{option}</Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      

    </View>
    </ScrollView>
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
    marginBottom: 20,
    color: '#333',
  },
  questionContainer: {
    marginBottom: 20,
    width: '80%',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#04AA6D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
