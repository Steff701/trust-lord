
import React from 'react';
import { StyleSheet } from 'react-native';
import { YStack, Button, Card, Text, XStack, View } from 'tamagui';
import { useRouter } from 'expo-router';
import { Plus, Home, QrCode } from '@tamagui/lucide-icons';

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

// Mock data with more details for lease generation
const properties = [
  {
    id: 'prop1',
    name: 'Makerere Hostel',
    address: 'Makerere Hill Road, Kampala',
    tenantsCount: 3,
    mockLeaseTerms: {
      monthlyRent: 800000,
      currency: 'UGX',
      securityDeposit: 800000,
      leaseDuration: 12, // months
    },
  },
  {
    id: 'prop2',
    name: 'Kikoni Flats',
    address: 'Kikoni, Kampala',
    tenantsCount: 5,
    mockLeaseTerms: {
      monthlyRent: 650000,
      currency: 'UGX',
      securityDeposit: 650000,
      leaseDuration: 6, // months
    },
  },
];

export default function LandlordDashboard() {
  const router = useRouter();

  return (
    <YStack style={styles.container}>
      <Button style={styles.addPropertyButton} icon={<Plus size={20} color={Colors.cardBackground} />} onPress={() => router.push('/(app)/(landlord)/add-property')}>
        <Text style={styles.addPropertyButtonText}>Add New Property</Text>
      </Button>

      <YStack style={styles.propertyList}>
        {properties.map((prop) => (
          <Card key={prop.id} style={styles.propertyCard}>
            <Card.Header style={styles.propertyCardHeader}>
              <XStack style={styles.propertyCardHeaderContent}>
                <XStack style={styles.propertyTitleContainer}>
                  <Home size={20} color={Colors.infoColor} />
                  <Text style={styles.propertyName}>{prop.name}</Text>
                </XStack>
                <Text style={styles.tenantCount}>{prop.tenantsCount} Tenants</Text>
              </XStack>
            </Card.Header>
            <Card.Footer style={styles.propertyCardFooter}>
              <XStack style={styles.propertyCardFooterContent}>
                <Button
                  style={styles.addTenantButton}
                  icon={<QrCode size={16} color={Colors.cardBackground} />}
                  onPress={() => router.push({
                    pathname: '/(app)/(landlord)/generate-qr',
                    params: {
                      propertyId: prop.id,
                      propertyName: prop.name,
                      monthlyRent: prop.mockLeaseTerms.monthlyRent,
                      currency: prop.mockLeaseTerms.currency,
                      securityDeposit: prop.mockLeaseTerms.securityDeposit,
                      leaseDuration: prop.mockLeaseTerms.leaseDuration,
                    }
                  })}
                >
                  <Text style={styles.addTenantButtonText}>Add Tenant</Text>
                </Button>
                <Button
                  style={styles.viewTenantsButton}
                  onPress={() => router.push({
                    pathname: '/(app)/(landlord)/tenants',
                    params: { propertyId: prop.id }
                  })}
                >
                  <Text style={styles.viewTenantsButtonText}>View Tenants</Text>
                </Button>
              </XStack>
            </Card.Footer>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.primaryBackground,
  },
  addPropertyButton: {
    backgroundColor: Colors.accentColor,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addPropertyButtonText: {
    color: Colors.cardBackground,
    fontSize: 16,
    fontWeight: '600',
  },
  propertyList: {
    marginTop: 16,
    gap: 12,
  },
  propertyCard: {
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
  propertyCardHeader: {
    padding: 16,
  },
  propertyCardHeaderContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyTitleContainer: {
    alignItems: 'center',
    gap: 8,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  tenantCount: {
    fontSize: 16,
    color: Colors.secondaryText,
  },
  propertyCardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
  propertyCardFooterContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addTenantButton: {
    flex: 1,
    backgroundColor: Colors.accentColor,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addTenantButtonText: {
    color: Colors.cardBackground,
    fontSize: 14,
    fontWeight: '600',
  },
  viewTenantsButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: Colors.infoColor, // Using infoColor for secondary action
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTenantsButtonText: {
    color: Colors.cardBackground,
    fontSize: 14,
    fontWeight: '600',
  },
});

