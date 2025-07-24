
import React, { useState } from 'react';
import { YStack, Input, Button, Text, Spinner } from 'tamagui';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export default function AddPropertyScreen() {
  const router = useRouter();
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProperty = async () => {
    if (!propertyName || !address || !rentAmount) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    Alert.alert('Success', 'Property added successfully!');
    router.back();
  };

  return (
    <YStack flex={1} p="$4" gap="$4" backgroundColor="$background">
      <Input
        placeholder="Property Name (e.g., 'Makerere Hostel')"
        value={propertyName}
        onChangeText={setPropertyName}
        size="$4"
        borderColor="$borderColor"
      />
      <Input
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        size="$4"
        borderColor="$borderColor"
      />
      <Input
        placeholder="Monthly Rent (UGX)"
        value={rentAmount}
        onChangeText={setRentAmount}
        keyboardType="numeric"
        size="$4"
        borderColor="$borderColor"
      />
      <Button
        onPress={handleAddProperty}
        disabled={loading}
        icon={loading ? <Spinner /> : null}
        size="$4"
        theme="alt1"
      >
        {loading ? 'Adding...' : 'Add Property'}
      </Button>
    </YStack>
  );
} 
