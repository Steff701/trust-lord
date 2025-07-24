
import React from 'react';
import { YStack, Card, Text, XStack } from 'tamagui';
import { User, CheckCircle, XCircle } from '@tamagui/lucide-icons';

// Mock data
const tenants = [
  { id: 'ten1', name: 'John Doe', status: 'Active' },
  { id: 'ten2', name: 'Jane Smith', status: 'Active' },
  { id: 'ten3', name: 'Peter Jones', status: 'Expired' },
];

export default function TenantsScreen() {
  return (
    <YStack flex={1} p="$4" gap="$4" backgroundColor="$background">
      <YStack space="$3">
        {tenants.map((tenant) => (
          <Card key={tenant.id} elevate size="$4" bordered>
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <User size="$1" color="$blue10" />
                  <Text fontSize="$6" fontWeight="bold">{tenant.name}</Text>
                </XStack>
                <XStack alignItems="center" gap="$2">
                  {tenant.status === 'Active' ? (
                    <CheckCircle color="$green10" size="$2" />
                  ) : (
                    <XCircle color="$red10" size="$2" />
                  )}
                  <Text color={tenant.status === 'Active' ? '$green10' : '$red10'}>
                    {tenant.status}
                  </Text>
                </XStack>
              </XStack>
            </Card.Header>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}
