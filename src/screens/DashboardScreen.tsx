import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuCard from '../components/MenuCard';

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laundry Management</Text>

      <MenuCard
        title="👤 Customer"
        onPress={() => navigation.navigate('Customer')}
      />

      <MenuCard
        title="🧺 Order Laundry"
        onPress={() => navigation.navigate('Order')}
      />

      <MenuCard
        title="💰 Pembayaran"
        onPress={() => navigation.navigate('Payment')}
      />

      <MenuCard
        title="📋 Riwayat"
        onPress={() => navigation.navigate('History')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2196F3',
  },
});
