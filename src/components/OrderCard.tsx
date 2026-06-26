import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderCard() {
  return (
    <View style={styles.card}>
      <Text>Order Laundry</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
});
