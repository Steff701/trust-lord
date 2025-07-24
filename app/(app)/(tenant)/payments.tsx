
import React from 'react';
import { YStack, Card, Text, XStack, Button } from 'tamagui';
import { CheckCircle, XCircle, DollarSign } from '@tamagui/lucide-icons';

const payments = [
  { id: 'pay1', date: 'July 1, 2025', amount: '500,000 UGX', status: 'Confirmed' },
  { id: 'pay2', date: 'June 1, 2025', amount: '500,000 UGX', status: 'Confirmed' },
  { id: 'pay3', date: 'May 1, 2025', amount: '500,000 UGX', status: 'Confirmed' },
];

export default function PaymentsScreen() {
  return (
    <YStack flex={1} p="$4" gap="$4" backgroundColor="$background">
      <Button icon={<DollarSign />} size="$4" theme="alt1">
        Pay Rent
      </Button>
      <YStack space="$3">
        {payments.map((payment) => (
          <Card key={payment.id} elevate size="$4" bordered>
            <Card.Header>
              <XStack justifyContent="space-between" alignItems="center">
                <YStack>
                  <Text fontSize="$6" fontWeight="bold">{payment.amount}</Text>
                  <Text fontSize="$4" color="$gray10">{payment.date}</Text>
                </YStack>
                <XStack alignItems="center" gap="$2">
                  {payment.status === 'Confirmed' ? (
                    <CheckCircle color="#00d4aa" size="$2" />
                  ) : (
                    <XCircle color="#ff0000" size="$2" />
                  )}
                  <Text color={payment.status === 'Confirmed' ? 'green' : 'red'}>
                    {payment.status}
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
