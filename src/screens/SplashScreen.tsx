import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Laundry Management</Text>

      <Text style={styles.subtitle}>Cepat • Bersih • Profesional</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#2563EB',
  },

  logo: {
    width: 220,

    height: 120,

    marginBottom: 20,
  },

  title: {
    fontSize: 30,

    fontWeight: 'bold',

    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 14,

    color: '#DBEAFE',

    marginTop: 8,
  },
});
