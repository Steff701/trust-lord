
import React from 'react';
import { YStack, Text, View } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';

// This is a placeholder for a real QR code generator
const QRCodePlaceholder = () => (
  <View
    width={250}
    height={250}
    backgroundColor="$gray4"
    alignItems="center"
    justifyContent="center"
    borderRadius="$4"
  >
    <Text color="$gray10">[QR Code]</Text>
  </View>
);

export default function GenerateQRScreen() {
  const { propertyId } = useLocalSearchParams();

  return (
    <YStack flex={1} p="$4" gap="$4" alignItems="center" justifyContent="center" backgroundColor="$background">
      <Text fontSize="$6" fontWeight="bold" textAlign="center">Scan to Join Lease</Text>
      <Text fontSize="$4" color="$gray10">Property ID: {propertyId}</Text>
      <QRCodePlaceholder />
      <Text textAlign="center" marginTop="$4" fontSize="$4" color="$gray10">
        Ask your new tenant to scan this QR code to view and sign the lease agreement.
      </Text>
    </YStack>
  );
}
