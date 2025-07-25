import React from 'react';
import { StyleSheet } from 'react-native';
import { YStack, XStack, Text, H1, H2, Card, View } from 'tamagui';
import { User, Building, Shield } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

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

      <YStack style={styles.roleSelectionSection}>
        <H2 style={styles.roleSelectionTitle}>
          How will you use Trust Lord?
        </H2>

        <Card
          elevate
          size="$4"
          style={styles.roleCard}
          pressStyle={{ scale: 0.98, borderColor: Colors.accentColor }}
          onPress={() => handleRoleSelection('tenant')}
        >
          <Card.Header>
            <XStack style={styles.roleCardHeader}>
              <View style={styles.tenantIconContainer}>
                <User size={24} color={Colors.infoColor} />
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

        <Card
          elevate
          size="$4"
          style={styles.roleCard}
          pressStyle={{ scale: 0.98, borderColor: Colors.accentColor }}
          onPress={() => handleRoleSelection('landlord')}
        >
          <Card.Header>
            <XStack style={styles.roleCardHeader}>
              <View style={styles.landlordIconContainer}>
                <Building size={24} color={Colors.successColor} />
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
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: Colors.infoColor,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primaryText,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.infoColor,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  roleSelectionSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  roleSelectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.primaryText,
    textAlign: 'center',
    marginBottom: 16,
  },
  roleCard: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  roleCardHeader: {
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  tenantIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE', // Light blue background for tenant icon
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landlordIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#D1FAE5', // Light green background for landlord icon
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primaryText,
  },
  roleDescription: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
  },
  footer: {
    paddingBottom: 24,
    paddingTop: 16,
  },
  footerText: {
    fontSize: 10,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 16,
  },
});
