
import React from 'react';
import { YStack, Button, Card, Text, XStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { Plus, Home } from '@tamagui/lucide-icons';

// Mock data
const properties = [
  { id: 'prop1', name: 'Makerere Hostel', tenants: 3 },
  { id: 'prop2', name: 'Kikoni Flats', tenants: 5 },
];

export default function LandlordDashboard() {
  const router = useRouter();

  return (
    <YStack flex={1} p="$4" gap="$4" backgroundColor="$background">
      <Button icon={<Plus />} size="$4" theme="alt1" onPress={() => router.push('/(app)/(landlord)/add-property')}>
        Add New Property
      </Button>

      <YStack space="$3" marginTop="$4">
        {properties.map((prop) => (
          <Card key={prop.id} elevate size="$4" bordered onPress={() => router.push('/(app)/(landlord)/tenants')}>
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <Home size="$1" color="$blue10" />
                  <Text fontSize="$6" fontWeight="bold">{prop.name}</Text>
                </XStack>
                <Text fontSize="$4" color="$gray10">{prop.tenants} Tenants</Text>
              </XStack>
            </Card.Header>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}
