import React from 'react';
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
    <YStack flex={1} backgroundColor="$background" paddingHorizontal="$4" paddingTop="$8">
      {/* Header Section */}
      <YStack alignItems="center" paddingTop="$6" paddingBottom="$8">
        <View
          width={80}
          height={80}
          backgroundColor="$blue10"
          borderRadius="$6"
          alignItems="center"
          justifyContent="center"
          marginBottom="$4"
        >
          <Shield size={40} color="white" />
        </View>

        <H1
          fontSize="$8"
          fontWeight="bold"
          color="$color"
          textAlign="center"
          marginBottom="$2"
        >
          Trust Lord
        </H1>

        <Text
          fontSize="$5"
          fontWeight="600"
          color="$blue10"
          textAlign="center"
          marginBottom="$4"
        >
          Real Rent. Real Trust. Real Transparency.
        </Text>

        <Text
          fontSize="$4"
          color="$gray10"
          textAlign="center"
          lineHeight="$2"
          paddingHorizontal="$2"
        >
          Secure property rentals with blockchain-backed lease agreements and transparent payment tracking
        </Text>
      </YStack>

      {/* Role Selection Section */}
      <YStack flex={1} justifyContent="center" gap="$4">
        <H2
          fontSize="$6"
          fontWeight="600"
          color="$color"
          textAlign="center"
          marginBottom="$4"
        >
          How will you use Trust Lord?
        </H2>

        {/* Tenant Option */}
        <Card
          elevate
          size="$4"
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          pressStyle={{ scale: 0.98, borderColor: '$blue8' }}
          onPress={() => handleRoleSelection('tenant')}
        >
          <Card.Header>
            <XStack alignItems="center" gap="$4" padding="$4">
              <View
                width={48}
                height={48}
                backgroundColor="$blue2"
                borderRadius="$4"
                alignItems="center"
                justifyContent="center"
              >
                <User size={24} color="$blue10" />
              </View>

              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$color">
                  I'm a Tenant
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
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
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
          pressStyle={{ scale: 0.98, borderColor: '$blue8' }}
          onPress={() => handleRoleSelection('landlord')}
        >
          <Card.Header>
            <XStack alignItems="center" gap="$4" padding="$4">
              <View
                width={48}
                height={48}
                backgroundColor="$green2"
                borderRadius="$4"
                alignItems="center"
                justifyContent="center"
              >
                <Building size={24} color="$green10" />
              </View>

              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$color">
                  I'm a Landlord
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  Create property listings, generate QR codes, and manage tenants
                </Text>
              </YStack>
            </XStack>
          </Card.Header>
        </Card>
      </YStack>

      {/* Footer */}
      <YStack paddingBottom="$6" paddingTop="$4">
        <Text
          fontSize="$2"
          color="$gray8"
          textAlign="center"
          lineHeight="$1"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </YStack>
    </YStack>
  );
}