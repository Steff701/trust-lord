import React from 'react';
import { StyleSheet } from 'react-native';
import { YStack, XStack, Text, H1, H2, Card, View } from 'tamagui';
import { User, Building, Shield } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleRoleSelection = (role: 'tenant' | 'landlord') => {
    router.push({
      pathname: '/(auth)/login',
      params: { role }
    });
  };

  return (
    <YStack style={styles.container}>
      {/* Header Section */}
      <YStack style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <Shield size={40} color="white" />
        </View>

        <H1 style={styles.title}>
          Trust Lord
        </H1>

        <Text style={styles.subtitle}>
          Real Rent. Real Trust. Real Transparency.
        </Text>

        <Text style={styles.description}>
          Secure property rentals with blockchain-backed lease agreements and transparent payment tracking
        </Text>
      </YStack>

      {/* Role Selection Section */}
      <YStack style={styles.roleSelectionSection}>
        <H2 style={styles.roleSelectionTitle}>
          How will you use Trust Lord?
        </H2>

        {/* Tenant Option */}
        <Card
          elevate
          size="$4"
          style={styles.roleCard}
          pressStyle={{ scale: 0.98, borderColor: '#6366F1' }} // Approximate $blue8
          onPress={() => handleRoleSelection('tenant')}
        >
          <Card.Header>
            <XStack style={styles.roleCardHeader}>
              <View style={styles.tenantIconContainer}>
                <User size={24} color="#3B82F6" /> {/* Approximate $blue10 */}
              </View>

              <YStack style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>
                  I'm a Tenant
                </Text>
                <Text style={styles.roleDescription}>
                  Scan QR codes, access lease agreements, and track rent payments
                </Text>
              </YStack>
            </XStack>
          </Card.Header>
        </Card>

        {/* Landlord Option */}
        <Card
          elevate
          size="$4"
          style={styles.roleCard}
          pressStyle={{ scale: 0.98, borderColor: '#6366F1' }} // Approximate $blue8
          onPress={() => handleRoleSelection('landlord')}
        >
          <Card.Header>
            <XStack style={styles.roleCardHeader}>
              <View style={styles.landlordIconContainer}>
                <Building size={24} color="#22C55E" /> {/* Approximate $green10 */}
              </View>

              <YStack style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>
                  I'm a Landlord
                </Text>
                <Text style={styles.roleDescription}>
                  Create property listings, generate QR codes, and manage tenants
                </Text>
              </YStack>
            </XStack>
          </Card.Header>
        </Card>
      </YStack>

      {/* Footer */}
      <YStack style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Approximate $background
    paddingHorizontal: 16, // Approximate $4
    paddingTop: 32, // Approximate $8
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 24, // Approximate $6
    paddingBottom: 32, // Approximate $8
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#3B82F6', // Approximate $blue10
    borderRadius: 24, // Approximate $6
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // Approximate $4
  },
  title: {
    fontSize: 48, // Approximate $8
    fontWeight: 'bold',
    color: '#000000', // Approximate $color
    textAlign: 'center',
    marginBottom: 8, // Approximate $2
  },
  subtitle: {
    fontSize: 24, // Approximate $5
    fontWeight: '600',
    color: '#3B82F6', // Approximate $blue10
    textAlign: 'center',
    marginBottom: 16, // Approximate $4
  },
  description: {
    fontSize: 16, // Approximate $4
    color: '#6B7280', // Approximate $gray10
    textAlign: 'center',
    lineHeight: 24, // Approximate $2
    paddingHorizontal: 8, // Approximate $2
  },
  roleSelectionSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 16, // Approximate $4
  },
  roleSelectionTitle: {
    fontSize: 28, // Approximate $6
    fontWeight: '600',
    color: '#000000', // Approximate $color
    textAlign: 'center',
    marginBottom: 16, // Approximate $4
  },
  roleCard: {
    backgroundColor: '#FFFFFF', // Approximate $background
    borderWidth: 1,
    borderColor: '#E5E7EB', // Approximate $borderColor
  },
  roleCardHeader: {
    alignItems: 'center',
    gap: 16, // Approximate $4
    padding: 16, // Approximate $4
  },
  tenantIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE', // Approximate $blue2
    borderRadius: 16, // Approximate $4
    alignItems: 'center',
    justifyContent: 'center',
  },
  landlordIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#D1FAE5', // Approximate $green2
    borderRadius: 16, // Approximate $4
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20, // Approximate $5
    fontWeight: '600',
    color: '#000000', // Approximate $color
  },
  roleDescription: {
    fontSize: 12, // Approximate $3
    color: '#6B7280', // Approximate $gray10
    marginTop: 4, // Approximate $1
  },
  footer: {
    paddingBottom: 24, // Approximate $6
    paddingTop: 16, // Approximate $4
  },
  footerText: {
    fontSize: 10, // Approximate $2
    color: '#9CA3AF', // Approximate $gray8
    textAlign: 'center',
    lineHeight: 16, // Approximate $1
  },
});
