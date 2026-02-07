import { createPaperTheme } from '@/constants/themes/colors';
import { useAuth } from '@/contexts/auth-context';
import { router } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const { session, loading } = useAuth();

  // Always use dark theme for index/loading screen
  const darkTheme = useMemo(() => createPaperTheme('dark'), []);

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.replace('/home');
      } else {
        router.replace('/sign-in');
      }
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
        <ActivityIndicator size="large" color={darkTheme.colors.primary} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
