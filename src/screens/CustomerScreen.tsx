import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Customer = {
  id: string;
  nama: string;
  telepon: string;
  alamat: string;
};

export default function CustomerScreen() {
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const simpanCustomer = () => {
    if (!nama.trim() || !telepon.trim() || !alamat.trim()) {
      Alert.alert('Peringatan', 'Semua data harus diisi');
      return;
    }

    if (editId) {
      const hasil = customers.map(item =>
        item.id === editId
          ? {
              ...item,
              nama,
              telepon,
              alamat,
            }
          : item,
      );

      setCustomers(hasil);

      Alert.alert('Berhasil', 'Data customer berhasil diupdate');

      setEditId(null);
    } else {
      const customerBaru: Customer = {
        id: Date.now().toString(),
        nama,
        telepon,
        alamat,
      };

      setCustomers([...customers, customerBaru]);

      Alert.alert('Berhasil', 'Customer berhasil ditambahkan');
    }

    setNama('');
    setTelepon('');
    setAlamat('');
  };

  const editCustomer = (customer: Customer) => {
    setNama(customer.nama);
    setTelepon(customer.telepon);
    setAlamat(customer.alamat);
    setEditId(customer.id);
  };

  const hapusCustomer = (id: string) => {
    Alert.alert('Konfirmasi', 'Apakah yakin ingin menghapus customer ini?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          setCustomers(customers.filter(item => item.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Customer</Text>

      <TextInput
        placeholder="Nama Customer"
        style={styles.input}
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        placeholder="No HP"
        style={styles.input}
        keyboardType="phone-pad"
        value={telepon}
        onChangeText={setTelepon}
      />

      <TextInput
        placeholder="Alamat"
        style={styles.input}
        value={alamat}
        onChangeText={setAlamat}
      />

      <TouchableOpacity style={styles.button} onPress={simpanCustomer}>
        <Text style={styles.buttonText}>
          {editId ? 'Update Customer' : 'Tambah Customer'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={customers}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada data customer.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nama}>{item.nama}</Text>

            <Text>No HP : {item.telepon}</Text>

            <Text>Alamat : {item.alamat}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editCustomer(item)}
              >
                <Text style={styles.buttonLabel}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => hapusCustomer(item.id)}
              >
                <Text style={styles.buttonLabel}>Hapus</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
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
    marginTop: 30,
    color: 'gray',
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

  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#F9A825',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },

  buttonLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
