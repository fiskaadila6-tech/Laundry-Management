import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import MenuCard from '../components/MenuCard';

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laundry Management</Text>

      <Text style={styles.subtitle}>Selamat Datang 👋</Text>

      <View style={styles.statsContainer}>
        <View style={styles.cardStat}>
          <Text style={styles.number}>25</Text>
          <Text>Pelanggan</Text>
        </View>

        <View style={styles.cardStat}>
          <Text style={styles.number}>60</Text>
          <Text>Order</Text>
        </View>
      </View>

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

      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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

    color: '#2563EB',

    marginTop: 10,
  },

  subtitle: {
    textAlign: 'center',

    color: '#64748B',

    marginBottom: 25,

    fontSize: 16,
  },

  statsContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 20,
  },

  cardStat: {
    backgroundColor: '#FFFFFF',

    width: '48%',

    padding: 20,

    borderRadius: 15,

    elevation: 4,

    alignItems: 'center',
  },

  number: {
    fontSize: 28,

    fontWeight: 'bold',

    color: '#2563EB',
  },

  logout: {
    marginTop: 20,

    backgroundColor: '#EF4444',

    padding: 15,

    borderRadius: 12,
  },

  logoutText: {
    textAlign: 'center',

    color: '#FFFFFF',

    fontWeight: 'bold',

    fontSize: 16,
  },
});
