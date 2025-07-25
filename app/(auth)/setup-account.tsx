import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { YStack, Input, Button, Text, Spinner } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
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

export default function SetupAccountScreen() {
  const { phoneNumber, role } = useLocalSearchParams();
  const { signIn } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idNumberError, setIdNumberError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateNIN = (nin: string) => {
    // Basic Ugandan NIN validation: 14 characters, alphanumeric
    const ugandanNinRegex = /^[A-Z0-9]{14}$/;
    if (role === 'landlord' && !ugandanNinRegex.test(nin)) {
      setIdNumberError('Please enter a valid 14-character Ugandan National ID Number.');
      return false;
    }
    setIdNumberError('');
    return true;
  };

  const handleSetupAccount = async () => {
    if (!firstName || !lastName) {
      Alert.alert('Error', 'Please fill in your first and last name.');
      return;
    }

    if (role === 'landlord') {
      if (!validateNIN(idNumber)) {
        return;
      }
    }

    setLoading(true);
    try {
      const userProfile = {
        firstName,
        lastName,
        email: email || undefined,
        phoneNumber: phoneNumber as string,
        idNumber: role === 'landlord' ? idNumber : undefined,
        idType: role === 'landlord' ? 'national_id' : undefined,
      };
      await signIn(role as 'tenant' | 'landlord', userProfile);
    } catch (error) {
      Alert.alert('Account Setup Failed', 'An error occurred during account setup.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <YStack style={styles.contentContainer}>
          <Text style={styles.title}>Setup Your {role === 'landlord' ? 'Landlord' : 'Tenant'} Account</Text>
          <Text style={styles.subtitle}>Just a few more details to get started.</Text>

          <Input
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            size="$4"
          />
          <Input
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            size="$4"
          />
          <Input
            style={styles.input}
            placeholder="Email (Optional)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            size="$4"
          />

          {role === 'landlord' && (
            <>
              <Text style={styles.sectionTitle}>National ID Details</Text>
              <Input
                style={[styles.input, idNumberError ? styles.inputError : {}]}
                placeholder="National ID Number (14 characters)"
                value={idNumber}
                onChangeText={(text) => {
                  setIdNumber(text);
                  if (idNumberError) validateNIN(text);
                }}
                onBlur={() => validateNIN(idNumber)}
                keyboardType="default"
                autoCapitalize="characters"
                maxLength={14}
                size="$4"
              />
              {idNumberError ? <Text style={styles.errorText}>{idNumberError}</Text> : null}
            </>
          )}

          <Button
            style={styles.button}
            onPress={handleSetupAccount}
            disabled={loading}
            icon={loading ? <Spinner /> : null}
            size="$4"
          >
            {loading ? 'Setting Up...' : 'Complete Setup'}
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: Colors.primaryText,
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
  errorText: {
    color: Colors.errorColor,
    fontSize: 12,
    textAlign: 'left',
    marginTop: -10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.accentColor,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
