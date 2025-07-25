
import React from 'react';
import { StyleSheet } from 'react-native';
import { YStack, Text, View } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';

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

export default function GenerateQRScreen() {
  const { propertyId, propertyName, monthlyRent, currency, securityDeposit, leaseDuration } = useLocalSearchParams();

  // Construct mock QR lease data based on the QRLeaseData interface from scan-lease.tsx
  const mockQRData = {
    leaseId: `lease_${propertyId}_${Date.now()}`,
    landlordId: 'mock-landlord-id', // Replace with actual landlord ID
    propertyId: propertyId as string,
    propertyName: propertyName as string,
    propertyAddress: 'Mock Address, Kampala', // Placeholder
    unitNumber: 'Unit A', // Placeholder
    monthlyRent: Number(monthlyRent),
    currency: currency as string,
    securityDeposit: Number(securityDeposit),
    leaseStartDate: new Date().toISOString().split('T')[0], // Current date
    leaseDuration: Number(leaseDuration),
    landlordName: 'Mock Landlord Name', // Placeholder
    landlordPhone: '+2567XXXXXXXX', // Placeholder
    timestamp: Date.now(),
    signature: 'mock-signature-hash',
  };

  return (
    <YStack style={styles.container}>
      <Text style={styles.title}>Scan to Join Lease</Text>
      <Text style={styles.propertyInfo}>Property: {propertyName}</Text>
      <Text style={styles.propertyInfo}>Property ID: {propertyId}</Text>
      <View style={styles.qrCodePlaceholder}>
        <Text style={styles.qrCodeText}>
          {JSON.stringify(mockQRData, null, 2)}
        </Text>
      </View>
      <Text style={styles.instructionText}>
        Ask your new tenant to scan this QR code to view and sign the lease agreement.
      </Text>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryText,
  },
  propertyInfo: {
    fontSize: 16,
    color: Colors.secondaryText,
  },
  qrCodePlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: Colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
  },
  qrCodeText: {
    fontSize: 10,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  instructionText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: Colors.secondaryText,
  },
});

