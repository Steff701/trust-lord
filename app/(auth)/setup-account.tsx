import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { YStack, Input, Button, Text, Spinner, Select } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from 'services/auth';
import { ChevronDown } from '@tamagui/lucide-icons';

export default function SetupAccountScreen() {
  const { phoneNumber, role } = useLocalSearchParams();
  const { signIn } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idType, setIdType] = useState('national_id'); // Default for landlords
  const [loading, setLoading] = useState(false);

  const handleSetupAccount = async () => {
    if (!firstName || !lastName) {
      Alert.alert('Error', 'Please fill in your first and last name.');
      return;
    }

    if (role === 'landlord' && (!idNumber || !idType)) {
      Alert.alert('Error', 'Landlords must provide National ID details.');
      return;
    }

    setLoading(true);
    try {
      const userProfile = {
        firstName,
        lastName,
        email: email || undefined,
        phoneNumber: phoneNumber as string,
        idNumber: role === 'landlord' ? idNumber : undefined,
        idType: role === 'landlord' ? idType : undefined,
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
                style={styles.input}
                placeholder="National ID Number"
                value={idNumber}
                onChangeText={setIdNumber}
                keyboardType="default"
                size="$4"
              />
              {/* For simplicity, we'll keep idType fixed for now as national_id */}
              {/* <Select value={idType} onValueChange={setIdType} size="$4">
                <Select.Trigger style={styles.selectTrigger} iconAfter={<ChevronDown size="$1" />}>
                  <Select.Value placeholder="Select ID Type" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Viewport>
                    <Select.Group>
                      <Select.Label>ID Type</Select.Label>
                      <Select.Item index={0} value="national_id">
                        <Text>National ID</Text>
                      </Select.Item>
                      <Select.Item index={1} value="passport">
                        <Text>Passport</Text>
                      </Select.Item>
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select> */}
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
    backgroundColor: '#F5F5F5',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    color: '#000000',
  },
  selectTrigger: {
    borderColor: '#CBD5E0',
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
