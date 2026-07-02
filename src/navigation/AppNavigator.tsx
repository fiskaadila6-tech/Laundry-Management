import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import DashboardScreen from '../screens/DashboardScreen';
import CustomerScreen from '../screens/CustomerScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentScreen from '../screens/PaymentScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },

        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="Dashboard" component={DashboardScreen} />

      <Stack.Screen name="Customer" component={CustomerScreen} />

      <Stack.Screen name="Order" component={OrderScreen} />

      <Stack.Screen name="Payment" component={PaymentScreen} />

      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}
