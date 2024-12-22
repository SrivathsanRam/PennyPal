import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ExchangeRate = () => {

  const API_KEY = 'd428651e8b2be04e144a9ce7';
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currencies = ["CNY", "MYR", "INR", "MMK", "BDT"];
  const mockExchangeRates = {
    CNY: 5.12,
    MYR: 3.45,
    INR: 60.78,
    MMK: 1600.12,
    BDT: 80.56,
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const rates: { [key: string]: number } = {};

        // Fetch exchange rates for each target currency
        for (const target of currencies) {
          const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/SGD/${target}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch exchange rates.");
          }

          const data = await response.json();

          if (data.result === "success") {
            rates[target] = data.conversion_rate;
          } else {
            throw new Error(`Error fetching rate for SGD to ${target}`);
          }
        }

        setExchangeRates(rates);
      } catch (err: any) {
        setExchangeRates(mockExchangeRates); // Use mock values if request fails
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading exchange rates...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exchange Rates (SGD)</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {exchangeRates &&
        Object.entries(exchangeRates).map(([currency, rate]) => (
          <View key={currency} style={styles.rateContainer}>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.rate}>{rate.toFixed(4)}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rate: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ExchangeRate;
