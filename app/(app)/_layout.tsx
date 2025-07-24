import { Stack } from 'expo-router';
import { useAuth } from 'services/auth';

export default function AppLayout() {
  const { user } = useAuth();

  // The actual redirection to (tenant) or (landlord) is handled in app/index.tsx
  // This layout simply provides a stack for the authenticated routes.
  return (
    <Stack>
      <Stack.Screen name="(tenant)" options={{ headerShown: false }} />
      <Stack.Screen name="(landlord)" options={{ headerShown: false }} />
    </Stack>
  );
}