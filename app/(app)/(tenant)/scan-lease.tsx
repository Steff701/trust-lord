
import React from 'react';
import { YStack, Text, Button } from 'tamagui';
import { Camera } from '@tamagui/lucide-icons';
import { Alert } from 'react-native';

export default function ScanLeaseScreen() {
  const handleScan = () => {
    // This would open the camera and start scanning
    Alert.alert("Scan Complete", "Lease details populated!");
  };

  return (
    <YStack flex={1} p="$4" gap="$4" alignItems="center" justifyContent="center" backgroundColor="$background">
      <Text fontSize="$6" fontWeight="bold" textAlign="center">Scan Lease QR Code</Text>
      <Text textAlign="center" fontSize="$4" color="$gray10">
        Point your camera at the QR code provided by your landlord to instantly get your lease details.
      </Text>
      <Button icon={<Camera />} size="$4" onPress={handleScan} theme="alt1">
        Scan QR Code
      </Button>
    </YStack>
  );
}
