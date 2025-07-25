import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { YStack, Input, Button, Text, Spinner } from 'tamagui';
import {router, useLocalSearchParams} from 'expo-router';
import { useAuth } from 'services/auth';

const Colors = {
  primaryBackground: '#F5F5F5',
  cardBackground: '#FFFFFF',
  primaryText: '#000000',
  secondaryText: '#6B7280',
  borderColor: '#CBD5E0',
  accentColor: '#F6AD55',
  accentDark: '#E0A040',
  infoColor: '#3B82F6',
  successColor: '#22C55E',
  errorColor: '#EF4444',
};

export default function VerifyOtpScreen() {
  const { phoneNumber, role } = useLocalSearchParams();
  const { signIn } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    setLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    router.replace({
      pathname: '/(auth)/setup-account',
      params: { phoneNumber, role },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <YStack style={styles.contentContainer}>
        <Text style={styles.title}>Verify Phone Number</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to {phoneNumber}</Text>
        <Input
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          size="$4"
        />
        <Button
          style={styles.button}
          onPress={handleVerifyOtp}
          disabled={loading}
          icon={loading ? <Spinner /> : null}
          size="$4"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    color: Colors.primaryText,
  },
  button: {
    backgroundColor: Colors.accentColor,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
