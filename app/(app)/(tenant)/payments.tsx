import React, { useEffect, useState } from 'react';
import { YStack, Text, Spinner, Button, H3, Paragraph } from 'tamagui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { CreditCard, DollarSign, CheckCircle, XCircle } from '@tamagui/lucide-icons';

export default function PaymentsScreen() {
  const router = useRouter();
  const { paymentMethod, leaseId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed'>('processing');

  useEffect(() => {
    const processPayment = async () => {
      setLoading(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock success or failure
      const success = Math.random() > 0.2; // 80% success rate

      if (success) {
        setPaymentStatus('success');
        Alert.alert(
          'Payment Successful!',
          `Your ${paymentMethod} payment for lease ${leaseId} was processed.`, [
            { text: 'OK', onPress: () => router.replace('/(app)/(tenant)') }
          ]
        );
      } else {
        setPaymentStatus('failed');
        Alert.alert(
          'Payment Failed',
          `Your ${paymentMethod} payment for lease ${leaseId} could not be processed. Please try again.`, [
            { text: 'OK', onPress: () => router.back() }
          ]
        );
      }
      setLoading(false);
    };

    if (paymentMethod && leaseId) {
      processPayment();
    } else {
      setLoading(false);
      setPaymentStatus('failed');
      Alert.alert(
        'Error',
        'Payment details missing. Please try again from the lease scan screen.', [
          { text: 'OK', onPress: () => router.replace('/(app)/(tenant)') }
        ]
      );
    }
  }, [paymentMethod, leaseId]);

  const getIcon = () => {
    if (loading || paymentStatus === 'processing') {
      return <Spinner size="large" color="#F6AD55" />;
    } else if (paymentStatus === 'success') {
      return <CheckCircle size={64} color="#22C55E" />;
    } else {
      return <XCircle size={64} color="#EF4444" />;
    }
  };

  const getMessage = () => {
    if (loading || paymentStatus === 'processing') {
      return `Processing your ${paymentMethod} payment for lease ${leaseId}...`;
    } else if (paymentStatus === 'success') {
      return `Payment for lease ${leaseId} was successful!`;
    } else {
      return `Payment for lease ${leaseId} failed.`;
    }
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="#F5F5F5" padding="$4">
      {getIcon()}
      <H3 textAlign="center" marginTop="$4" color="#000000">
        {getMessage()}
      </H3>
      {paymentStatus === 'failed' && (
        <Button onPress={() => router.back()} marginTop="$4" backgroundColor="#F6AD55">
          <Text color="#FFFFFF">Try Again</Text>
        </Button>
      )}
      {(loading || paymentStatus === 'processing') && (
        <Paragraph textAlign="center" marginTop="$2" color="#6B7280">
          Please do not close the app.
        </Paragraph>
      )}
    </YStack>
  );
}