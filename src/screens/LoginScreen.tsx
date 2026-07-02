import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }: any) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Peringatan', 'Username dan Password harus diisi');

      return;
    }

    try {
      const data = await AsyncStorage.getItem('user');

      if (!data) {
        Alert.alert('Info', 'Belum ada akun terdaftar');

        return;
      }

      const user = JSON.parse(data);

      // username diambil dari email yang didaftarkan
      if (
        username.trim() === user.email.trim() &&
        password.trim() === user.password.trim()
      ) {
        Alert.alert('Berhasil', `Selamat datang ${user.nama}`);

        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login gagal', 'Username atau Password salah');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Laundry Management</Text>

      <Text style={styles.subtitle}>Cepat • Bersih • Profesional</Text>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={22} color="#64748B" />

          <TextInput
            placeholder="username"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={username}
            onChangeText={setusername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="#64748B" />

          <TextInput
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Belum punya akun?
            <Text style={styles.daftar}> Daftar</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#2563EB',

    justifyContent: 'center',

    alignItems: 'center',

    padding: 20,
  },

  logoContainer: {
    width: 160,

    height: 160,

    borderRadius: 80,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 8,

    marginBottom: 20,
  },

  logo: {
    width: 180,

    height: 180,
  },

  title: {
    fontSize: 30,

    fontWeight: 'bold',

    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 14,

    color: '#DBEAFE',

    marginBottom: 30,
  },

  card: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 25,

    elevation: 5,
  },

  inputContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#F8FAFC',

    borderRadius: 12,

    paddingHorizontal: 15,

    marginBottom: 15,

    elevation: 2,
  },

  input: {
    flex: 1,

    padding: 14,

    marginLeft: 10,
  },

  button: {
    backgroundColor: '#2563EB',

    padding: 16,

    borderRadius: 12,

    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',

    textAlign: 'center',

    fontWeight: 'bold',

    fontSize: 16,
  },

  registerText: {
    marginTop: 20,

    textAlign: 'center',

    color: '#64748B',

    fontSize: 14,
  },

  daftar: {
    color: '#2563EB',

    fontWeight: 'bold',
  },
});
