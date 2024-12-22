import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TransactionBox from '@/components/TransactionBox';
import moment from 'moment';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'recent', title: 'Recent' },
    { key: 'pastMonth', title: 'Past Month' },
    { key: 'all', title: 'All Transactions' },
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const mobile_number = await AsyncStorage.getItem('userPhone');
        console.log(mobile_number);
        if (mobile_number) {
          const response = await fetch('http://10.37.7.73:8000/api/get_transaction/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile_number }),
          });
          const data = await response.json();
          setTransactions(data.transactions || []);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filterRecent = () => transactions.slice(0, 10);

  const filterPastMonth = () => {
    const oneMonthAgo = moment().subtract(1, 'month');
    return transactions.filter((t) => moment(t.date).isAfter(oneMonthAgo));
  };

  const renderTransactions = (filteredTransactions) => (
    <FlatList
    nestedScrollEnabled
      data={filteredTransactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TransactionBox
          transactionType={item.transaction_type}
          category={item.category}
          amount={item.amount}
          description={item.description}
          date={item.date}
        />
        
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>No transactions found.</Text>}
    />
  );

  const RecentTab = () => renderTransactions(filterRecent());
  const PastMonthTab = () => renderTransactions(filterPastMonth());
  const AllTab = () => renderTransactions(transactions);

  const renderScene = SceneMap({
    recent: RecentTab,
    pastMonth: PastMonthTab,
    all: AllTab,
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar

          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  indicator: {
    backgroundColor: '#000',
    height: 3,
  },
  tabBar: {
    backgroundColor: '#163735',
  },
  tabLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Transactions;
