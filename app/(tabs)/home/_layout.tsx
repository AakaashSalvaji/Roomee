import { HouseholdFormProvider } from '@/contexts/household-form-context';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <HouseholdFormProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: '', headerShown: false }} />
        <Stack.Screen
          name="edit-household"
          options={{ title: '', headerBackTitle: '' }}
        />
        <Stack.Screen
          name="manage-members"
          options={{ title: '', headerBackTitle: '' }}
        />
      </Stack>
    </HouseholdFormProvider>
  );
}
