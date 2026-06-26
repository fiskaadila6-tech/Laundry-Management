import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

type Order = {
  id: string;
  customer: string;
  berat: string;
  jenis: string;
  total: number;
};

export default function OrderScreen() {
  const [customer, setCustomer] = useState('');
  const [berat, setBerat] = useState('');
  const [jenis, setJenis] = useState('');

  const [orders, setOrders] = useState<Order[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const simpanOrder = () => {
    if (customer.trim() === '' || berat.trim() === '' || jenis.trim() === '') {
      Alert.alert('Peringatan', 'Semua data harus diisi');
      return;
    }

    const total = Number(berat) * 7000;

    if (editId) {
      const dataBaru = orders.map(item =>
        item.id === editId
          ? {
              ...item,
              customer,
              berat,
              jenis,
              total,
            }
          : item,
      );

      setOrders(dataBaru);
      Alert.alert('Berhasil', 'Order berhasil diupdate');
      setEditId(null);
    } else {
      const orderBaru: Order = {
        id: Date.now().toString(),
        customer,
        berat,
        jenis,
        total,
      };

      setOrders([...orders, orderBaru]);
      Alert.alert('Berhasil', 'Order berhasil ditambahkan');
    }

    setCustomer('');
    setBerat('');
    setJenis('');
  };

  const editOrder = (item: Order) => {
    setCustomer(item.customer);
    setBerat(item.berat);
    setJenis(item.jenis);
    setEditId(item.id);
  };

  const hapusOrder = (id: string) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus order ini?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          setOrders(orders.filter(item => item.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Laundry</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Customer"
        value={customer}
        onChangeText={setCustomer}
      />

      <TextInput
        style={styles.input}
        placeholder="Berat (Kg)"
        keyboardType="numeric"
        value={berat}
        onChangeText={setBerat}
      />

      <TextInput
        style={styles.input}
        placeholder="Jenis Laundry"
        value={jenis}
        onChangeText={setJenis}
      />

      <TouchableOpacity style={styles.button} onPress={simpanOrder}>
        <Text style={styles.buttonText}>
          {editId ? 'Update Order' : 'Tambah Order'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada order.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nama}>{item.customer}</Text>

            <Text>Berat : {item.berat} Kg</Text>
            <Text>Jenis : {item.jenis}</Text>
            <Text>Total : Rp {item.total}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => editOrder(item)}
              >
                <Text style={styles.textButton}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.hapus}
                onPress={() => hapusOrder(item.id)}
              >
                <Text style={styles.textButton}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  nama: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  row: {
    flexDirection: 'row',
    marginTop: 12,
  },

  edit: {
    flex: 1,
    backgroundColor: '#F9A825',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },

  hapus: {
    flex: 1,
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },

  textButton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
