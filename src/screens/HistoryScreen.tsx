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

type History = {
  id: string;
  customer: string;
  jenis: string;
  total: string;
  status: string;
};

export default function HistoryScreen() {
  const [customer, setCustomer] = useState('');
  const [jenis, setJenis] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('');

  const [history, setHistory] = useState<History[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const simpanHistory = () => {
    if (
      customer.trim() === '' ||
      jenis.trim() === '' ||
      total.trim() === '' ||
      status.trim() === ''
    ) {
      Alert.alert('Peringatan', 'Semua data harus diisi');
      return;
    }

    if (editId) {
      const dataBaru = history.map(item =>
        item.id === editId
          ? {
              ...item,
              customer,
              jenis,
              total,
              status,
            }
          : item,
      );

      setHistory(dataBaru);
      Alert.alert('Berhasil', 'Data berhasil diupdate');
      setEditId(null);
    } else {
      const data: History = {
        id: Date.now().toString(),
        customer,
        jenis,
        total,
        status,
      };

      setHistory([...history, data]);
      Alert.alert('Berhasil', 'Riwayat berhasil ditambahkan');
    }

    setCustomer('');
    setJenis('');
    setTotal('');
    setStatus('');
  };

  const editHistory = (item: History) => {
    setCustomer(item.customer);
    setJenis(item.jenis);
    setTotal(item.total);
    setStatus(item.status);
    setEditId(item.id);
  };

  const hapusHistory = (id: string) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus riwayat?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          setHistory(history.filter(item => item.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Laundry</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Customer"
        value={customer}
        onChangeText={setCustomer}
      />

      <TextInput
        style={styles.input}
        placeholder="Jenis Laundry"
        value={jenis}
        onChangeText={setJenis}
      />

      <TextInput
        style={styles.input}
        placeholder="Total Pembayaran"
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

      <TouchableOpacity style={styles.button} onPress={simpanHistory}>
        <Text style={styles.buttonText}>
          {editId ? 'Update Riwayat' : 'Tambah Riwayat'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={history}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada riwayat transaksi.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nama}>{item.customer}</Text>

            <Text>Jenis : {item.jenis}</Text>
            <Text>Total : Rp {item.total}</Text>
            <Text>Status : {item.status}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => editHistory(item)}
              >
                <Text style={styles.buttonLabel}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.hapus}
                onPress={() => hapusHistory(item.id)}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
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

  buttonLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
