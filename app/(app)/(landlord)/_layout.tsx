import { Stack } from 'expo-router';

export default function LandlordLayout() {
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
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="add-property"
        options={{
          title: 'Add Property',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="generate-qr"
        options={{
          title: 'Generate QR Code'
        }}
      />
      <Stack.Screen
        name="tenants"
        options={{
          title: 'My Tenants'
        }}
      />
    </Stack>
  );
}