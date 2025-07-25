import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { YStack, Text, H1, H3, Paragraph, Separator, Spinner, XStack } from 'tamagui';
import { useLocalSearchParams } from 'expo-router';
import { localApi } from 'services/localApi';
import { Home, MapPin, Calendar, DollarSign, Phone } from '@tamagui/lucide-icons';

interface LeaseData {
  propertyName: string;
  address: string;
  monthlyRent: number;
  currency: string;
  leaseStartDate: string; // Stored as string in local data
  leaseEndDate: string;   // Stored as string in local data
  landlordName: string;
  landlordPhone: string;
}

export default function ViewDocumentScreen() {
  const { documentId } = useLocalSearchParams(); // In a real app, this would be the IPFS hash or document ID
  const [leaseData, setLeaseData] = useState<LeaseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const tenantLease = await localApi.getTenantLease();
        if (tenantLease && tenantLease.lease) {
          setLeaseData(tenantLease.lease);
        } else {
          Alert.alert("No Lease Found", "No active lease document found locally.");
        }
      } catch (error) {
        console.error("Failed to load lease document:", error);
        Alert.alert("Error", "Could not load lease document.");
      } finally {
        setLoading(false);
      }
    };
    loadDocument();
  }, [documentId]);

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="#F5F5F5">
        <Spinner size="large" color="#3B82F6" />
        <Text marginTop="$3" color="#6B7280">Loading lease document...</Text>
      </YStack>
    );
  }

  if (!leaseData) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="#F5F5F5" padding="$4">
        <H3 color="#EF4444">Document Not Found</H3>
        <Paragraph textAlign="center" color="#6B7280">The lease document could not be loaded. Please ensure you have an active lease.</Paragraph>
      </YStack>
    );
  }

  const formatCurrency = (amount: number, currency: string = 'UGX'): string => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-UG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <YStack space="$4" padding="$4">
        <H1 textAlign="center" color="#000000">Lease Agreement</H1>
        <Paragraph textAlign="center" color="#6B7280">Details of your current lease.</Paragraph>

        <Separator />

        <YStack space="$2">
          <XStack alignItems="center" space="$2">
            <Home size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Property Details</Text>
          </XStack>
          <Text style={styles.detailText}><Text fontWeight="bold">Name:</Text> {leaseData.propertyName}</Text>
          <Text style={styles.detailText}><Text fontWeight="bold">Address:</Text> {leaseData.address}</Text>
        </YStack>

        <Separator />

        <YStack space="$2">
          <XStack alignItems="center" space="$2">
            <DollarSign size={20} color="#22C55E" />
            <Text style={styles.sectionTitle}>Financials</Text>
          </XStack>
          <Text style={styles.detailText}><Text fontWeight="bold">Monthly Rent:</Text> {formatCurrency(leaseData.monthlyRent, leaseData.currency)}</Text>
          <Text style={styles.detailText}><Text fontWeight="bold">Security Deposit:</Text> {formatCurrency(leaseData.monthlyRent, leaseData.currency)}</Text>
        </YStack>

        <Separator />

        <YStack space="$2">
          <XStack alignItems="center" space="$2">
            <Calendar size={20} color="#F6AD55" />
            <Text style={styles.sectionTitle}>Lease Period</Text>
          </XStack>
          <Text style={styles.detailText}><Text fontWeight="bold">Start Date:</Text> {formatDate(leaseData.leaseStartDate)}</Text>
          <Text style={styles.detailText}><Text fontWeight="bold">End Date:</Text> {formatDate(leaseData.leaseEndDate)}</Text>
        </YStack>

        <Separator />

        <YStack space="$2">
          <XStack alignItems="center" space="$2">
            <Phone size={20} color="#EF4444" />
            <Text style={styles.sectionTitle}>Landlord Information</Text>
          </XStack>
          <Text style={styles.detailText}><Text fontWeight="bold">Name:</Text> {leaseData.landlordName}</Text>
          <Text style={styles.detailText}><Text fontWeight="bold">Phone:</Text> {leaseData.landlordPhone}</Text>
        </YStack>

        {/* Add more lease details as needed */}

      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  detailText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
});