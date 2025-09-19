import React, { useCallback, createContext, useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
// import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View, Dimensions, Platform, Button, Text, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

import NetInfo from '@react-native-community/netinfo';
import { useFonts } from 'expo-font';


// Import your components/screens
import LandingPage from './Pages/LandingPage';
import Home from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LogInPage";
import ProfilePage from "./Pages/ProfilePage";
import TransactionsPage from "./Pages/TransactionsPage";
import SettingsPage from "./Pages/SettingsPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import AmazonePage from "./Pages/AmazonePage";
import CartPage from "./Pages/CartPage";
import SupportPage from "./Pages/SupportPage";
import VerificationPage from "./Pages/VerificationPage";


const Stack = createStackNavigator();
const { height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
          <View style={styles.container}> {/* Ensures full height */}
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Landing" component={LandingPage} />
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="signup" component={SignUpPage} />
                <Stack.Screen name="logIn" component={LoginPage} />
                <Stack.Screen name="profile" component={ProfilePage} />
                <Stack.Screen name="transactions" component={TransactionsPage} />
                <Stack.Screen name="settings" component={SettingsPage} />
                <Stack.Screen name="orderdetails" component={OrderDetailsPage} />
                <Stack.Screen name="amazon" component={AmazonePage} />
                <Stack.Screen name="cart" component={CartPage} />
                <Stack.Screen name="support" component={SupportPage} />
                <Stack.Screen name="verificationPage" component={VerificationPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
      </NativeBaseProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //the App's root view takes full height
  },
});

if (Platform.OS === 'web') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: - App.js:72', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: - App.js:74', registrationError);
      });
    });
  }
}

// Helper function to convert ArrayBuffer to Base64
function ArrayBufferToBase64(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}