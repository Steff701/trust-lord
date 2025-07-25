import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { YStack, Input, Button, Text, Spinner } from 'tamagui';
import { useLocalSearchParams, useRouter } from 'expo-router';

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

export default function LoginScreen() {
  const { role } = useLocalSearchParams();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const validatePhoneNumber = (number: string) => {
    // Ugandan phone number regex: starts with +256 and followed by 9 digits
    const ugandanPhoneRegex = /^\+256\d{9}$/;
    if (!ugandanPhoneRegex.test(number)) {
      setPhoneNumberError('Please enter a valid Ugandan phone number (e.g., +2567XXXXXXXX).');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    setLoading(true);
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    router.push({
      pathname: '/(auth)/verify-otp',
      params: { phoneNumber, role },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <YStack style={styles.contentContainer}>
        <Text style={styles.title}>Sign In as {role}</Text>
        <Text style={styles.subtitle}>Enter your phone number to continue</Text>
        <Input
          style={[styles.input, phoneNumberError ? styles.inputError : {}]}
          placeholder="Phone Number (e.g., +2567XXXXXXXX)"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (phoneNumberError) validatePhoneNumber(text);
          }}
          onBlur={() => validatePhoneNumber(phoneNumber)}
          keyboardType="phone-pad"
          size="$4"
        />
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
        <Button
          style={styles.button}
          onPress={handleSendOtp}
          disabled={loading}
          icon={loading ? <Spinner /> : null}
          size="$4"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
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
  inputError: {
    borderColor: Colors.errorColor,
  },
  button: {
    backgroundColor: Colors.accentColor,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: 12,
    textAlign: 'left',
    marginTop: -10,
    marginBottom: 5,
  },
});
