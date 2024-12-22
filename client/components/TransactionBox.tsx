import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TransactionBoxProps {
  transactionType: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

const TransactionBox: React.FC<TransactionBoxProps> = ({ transactionType, category, amount, description, date }) => {
  return (
    <View style={styles.container}>
  <Text style={styles.title}>
    {transactionType.toUpperCase()} - {category}
  </Text>
  <Text style={styles.description}>{description}</Text>
  <Text
    style={[
      styles.amount,
      {
        color:
          transactionType.toUpperCase() === "EXPENSE"
            ? "red"
            : transactionType.toUpperCase() === "REMITTANCE"
            ? "blue"
            : transactionType.toUpperCase() === "INCOME"
            ? "green"
            : "black", // Default color if no match
      },
    ]}
  >
    ${amount}
  </Text>
  <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
});

export default TransactionBox;
