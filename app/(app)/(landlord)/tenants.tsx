
import React from 'react';
import { StyleSheet } from 'react-native';
import { YStack, Card, Text, XStack, View } from 'tamagui';
import { User, CheckCircle, XCircle } from '@tamagui/lucide-icons';
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

const allTenants = [
  { id: 'ten1', name: 'John Doe', status: 'Active', propertyId: 'prop1' },
  { id: 'ten2', name: 'Jane Smith', status: 'Active', propertyId: 'prop1' },
  { id: 'ten3', name: 'Peter Jones', status: 'Expired', propertyId: 'prop2' },
  { id: 'ten4', name: 'Alice Brown', status: 'Active', propertyId: 'prop2' },
  { id: 'ten5', name: 'Bob White', status: 'Active', propertyId: 'prop1' },
];

export default function TenantsScreen() {
  const { propertyId } = useLocalSearchParams();

  const tenantsForProperty = allTenants.filter(tenant => tenant.propertyId === propertyId);

  return (
    <YStack style={styles.container}>
      {tenantsForProperty.length === 0 ? (
        <Text style={styles.noTenantsText}>
          No tenants found for this property.
        </Text>
      ) : (
        <YStack style={styles.tenantsList}>
          {tenantsForProperty.map((tenant) => (
            <Card key={tenant.id} style={styles.tenantCard}>
              <Card.Header style={styles.tenantCardHeader}>
                <XStack style={styles.tenantCardHeaderContent}>
                  <XStack style={styles.tenantNameContainer}>
                    <User size={16} color={Colors.infoColor} />
                    <Text style={styles.tenantName}>{tenant.name}</Text>
                  </XStack>
                  <XStack style={styles.statusContainer}>
                    {tenant.status === 'Active' ? (
                      <CheckCircle color={Colors.successColor} size={16} />
                    ) : (
                      <XCircle color={Colors.errorColor} size={16} />
                    )}
                    <Text style={tenant.status === 'Active' ? styles.statusActive : styles.statusExpired}>
                      {tenant.status}
                    </Text>
                  </XStack>
                </XStack>
              </Card.Header>
            </Card>
          ))}
        </YStack>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primaryBackground,
  },
  noTenantsText: {
    fontSize: 20,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginTop: 40,
  },
  tenantsList: {
    gap: 12,
  },
  tenantCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  tenantCardHeader: {
    padding: 16,
  },
  tenantCardHeaderContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tenantNameContainer: {
    alignItems: 'center',
    gap: 8,
  },
  tenantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  statusContainer: {
    alignItems: 'center',
    gap: 8,
  },
  statusActive: {
    color: Colors.successColor,
    fontSize: 16,
  },
  statusExpired: {
    color: Colors.errorColor,
    fontSize: 16,
  },
});
