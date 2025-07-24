
import React from 'react';
import { YStack, Text, Card, XStack } from 'tamagui';
import { Phone, Mail } from '@tamagui/lucide-icons';

export default function SupportScreen() {
  return (
    <YStack flex={1} p="$4" gap="$4" backgroundColor="$background">
      <Card elevate size="$4" bordered>
        <Card.Header>
          <YStack space="$2">
            <Text fontSize="$6" fontWeight="bold">Contact Your Landlord</Text>
            <XStack alignItems="center" gap="$2">
              <Phone size="$1" color="$blue10" />
              <Text fontSize="$4">+256 777 123 456</Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <Mail size="$1" color="$blue10" />
              <Text fontSize="$4">john.landlord@example.com</Text>
            </XStack>
          </YStack>
        </Card.Header>
      </Card>
      <Card elevate size="$4" bordered>
        <Card.Header>
          <YStack space="$2">
            <Text fontSize="$6" fontWeight="bold">Trust Lord Helpdesk</Text>
            <XStack alignItems="center" gap="$2">
              <Phone size="$1" color="$blue10" />
              <Text fontSize="$4">+256 700 987 654</Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <Mail size="$1" color="$blue10" />
              <Text fontSize="$4">support@trustlord.com</Text>
            </XStack>
          </YStack>
        </Card.Header>
      </Card>
    </YStack>
  );
}
