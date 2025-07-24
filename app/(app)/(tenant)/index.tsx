
import React from 'react';
import { YStack, Card, Text, Button, XStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { Home, DollarSign, QrCode } from '@tamagui/lucide-icons';

export default function TenantLeaseScreen() {
  const router = useRouter();

  const lease = {
    property: 'Makerere Hostel',
    rent: '500,000 UGX',
    dueDate: '1st August 2025',
  };

  return (
    <YStack flex={1} p="$4" gap="$4" backgroundColor="$background">
      <Card elevate size="$4" bordered>
        <Card.Header>
          <XStack alignItems="center" gap="$3">
            <Home size="$3" color="$blue10" />
            <YStack gap="$1">
              <Text fontSize="$6" fontWeight="bold">{lease.property}</Text>
              <Text fontSize="$4">Rent: {lease.rent}</Text>
              <Text fontSize="$4">Next Payment Due: {lease.dueDate}</Text>
            </YStack>
          </XStack>
        </Card.Header>
      </Card>
      <Button icon={<DollarSign />} size="$4" onPress={() => router.push('/(app)/(tenant)/payments')}>
        View Payment History
      </Button>
      <Button icon={<QrCode />} size="$4" onPress={() => router.push('/(app)/(tenant)/scan-lease')} theme="alt1">
        Scan New Lease QR
      </Button>
    </YStack>
  );
}
