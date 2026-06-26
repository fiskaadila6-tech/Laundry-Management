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

type Payment = {
  id: string;
  customer: string;
  total: string;
  status: string;
};

export default function PaymentScreen() {
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('');

  const [payments, setPayments] = useState<Payment[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const simpan = () => {
    if (customer.trim() === '' || total.trim() === '' || status.trim() === '') {
      Alert.alert('Peringatan', 'Semua data harus diisi');
      return;
    }

    if (editId) {
      const updateData = payments.map(item =>
        item.id === editId
          ? {
              ...item,
              customer,
              total,
              status,
            }
          : item,
      );

      setPayments(updateData);
      setEditId(null);

      Alert.alert('Berhasil', 'Data berhasil diupdate');
    } else {
      const dataBaru: Payment = {
        id: Date.now().toString(),
        customer,
        total,
        status,
      };

      setPayments([...payments, dataBaru]);

      Alert.alert('Berhasil', 'Data berhasil ditambahkan');
    }

    setCustomer('');
    setTotal('');
    setStatus('');
  };

  const edit = (item: Payment) => {
    setCustomer(item.customer);
    setTotal(item.total);
    setStatus(item.status);
    setEditId(item.id);
  };

  const hapus = (id: string) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus data?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          setPayments(payments.filter(item => item.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran Laundry</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Customer"
        value={customer}
        onChangeText={setCustomer}
      />

      <TextInput
        style={styles.input}
        placeholder="Total Bayar"
        keyboardType="numeric"
        value={total}
        onChangeText={setTotal}
      />

      <TextInput
        style={styles.input}
        placeholder="Status (Lunas / Belum Lunas)"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={simpan}>
        <Text style={styles.buttonText}>
          {editId ? 'Update Pembayaran' : 'Tambah Pembayaran'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada data pembayaran.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nama}>{item.customer}</Text>

            <Text>Total Bayar : Rp {item.total}</Text>
            <Text>Status : {item.status}</Text>

            <View style={styles.row}>
              <TouchableOpacity style={styles.edit} onPress={() => edit(item)}>
                <Text style={styles.textButton}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.hapus}
                onPress={() => hapus(item.id)}
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
    textAlign: 'center',
    color: '#2196F3',
    marginBottom: 20,
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
