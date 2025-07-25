import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { YStack, Input, Button, Text, Spinner } from 'tamagui';
import {router, useLocalSearchParams} from 'expo-router';
import { useAuth } from 'services/auth';

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
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    color: '#000000',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
