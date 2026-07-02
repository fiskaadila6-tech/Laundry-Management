import React, { useState } from 'react';

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }: any) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    if (
      nama.trim() === '' ||
      email.trim() === '' ||
      hp.trim() === '' ||
      alamat.trim() === '' ||
      password.trim() === ''
    ) {
      Alert.alert('Peringatan', 'Lengkapi semua data');

      return;
    }

    try {
      const user = {
        nama,

        email,

        hp,

        alamat,

        password,
      };

      await AsyncStorage.setItem(
        'user',

        JSON.stringify(user),
      );

      Alert.alert(
        'Berhasil',

        'Akun berhasil dibuat',
      );

      navigation.replace('Login');
    } catch (error) {
      Alert.alert(
        'Error',

        'Gagal menyimpan akun',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daftar Akun</Text>

      <TextInput
        placeholder="Nama Lengkap"
        style={styles.input}
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="No HP"
        keyboardType="phone-pad"
        style={styles.input}
        value={hp}
        onChangeText={setHp}
      />

      <TextInput
        placeholder="Alamat"
        style={styles.input}
        value={alamat}
        onChangeText={setAlamat}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>DAFTAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    justifyContent: 'center',

    padding: 25,

    backgroundColor: '#2563EB',
  },

  title: {
    fontSize: 30,

    fontWeight: 'bold',

    textAlign: 'center',

    marginBottom: 30,

    color: '#FFFFFF',
  },

  input: {
    backgroundColor: '#FFFFFF',

    borderRadius: 12,

    padding: 15,

    marginBottom: 15,

    elevation: 2,
  },

  button: {
    backgroundColor: '#0F172A',

    padding: 18,

    borderRadius: 12,

    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',

    textAlign: 'center',

    fontWeight: 'bold',

    fontSize: 16,
  },
});
