import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const DARK = '#0F172B';
const BLUE = '#2B7FFF';

type Props = {
  onCreateAccount?: () => void; // optional extra side-effect
  onLogin?: () => void;         // optional extra side-effect
};

export default function CartUpPageAccountOptionsSection({
  onCreateAccount,
  onLogin,
}: Props) {
  const router = useRouter();

  const handleCreate = () => {
    onCreateAccount?.(); // call optional callback
    router.push('/signup'); // navigate to signup page
  };

  const handleLogin = () => {
    onLogin?.();           // call optional callback
    router.push('/logIn'); // navigate to login page
  };

  return (
    <View style={styles.wrap}>
      {/* Create Account Section */}
      <Pressable
        style={styles.primaryBtn}
        onPress={handleCreate}
        android_ripple={{ color: 'rgba(255,255,255,0.15)' }}
      >
        <Text style={styles.primaryTxt}>Create your account</Text>
      </Pressable>

      {/* Already a member Section */}
      <Pressable
        style={styles.secondaryBtn}
        onPress={handleLogin}
        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
      >
        <Text style={styles.secondaryTxt}>Already a member? Log In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 18, marginBottom: 4 },
  primaryBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryTxt: {
    color: '#fff',
    fontFamily: 'ClashGrotesk',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryBtn: {
    marginTop: 12,
    height: 52,
    borderRadius: 16,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryTxt: {
    color: '#fff',
    fontFamily: 'ClashGrotesk',
    fontWeight: '700',
    fontSize: 16,
  },
});
