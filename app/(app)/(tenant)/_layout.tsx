import { Stack } from 'expo-router';

export default function TenantLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0a0a0a', // trust-dark
        },
        headerTintColor: '#e5e5e5', // trust-text
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLargeTitle: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'My Lease',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="scan-lease"
        options={{
          title: 'Scan QR Code',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="payments"
        options={{
          title: 'Payments'
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: 'Support'
        }}
      />
    </Stack>
  );
}