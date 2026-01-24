import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import 'react-native-reanimated';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { createPaperTheme } from '@/constants/themes/colors';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getIconForOS } from '@/utils/get-icon-for-os';

function AppContent() {
  // For navigation theme, use system color scheme (login/signup) or user preference (logged in)
  const userColorScheme = useColorScheme();
  const systemColorScheme = useRNColorScheme();
  const colorScheme = userColorScheme ?? systemColorScheme ?? 'light';
  const paperTheme = useMemo(
    () => createPaperTheme(colorScheme),
    [colorScheme]
  );

  const { LightTheme, DarkTheme: PaperDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: DarkTheme,
  });

  const navigationTheme = colorScheme === 'dark' ? PaperDarkTheme : LightTheme;

  return (
    <PaperProvider theme={paperTheme}
      settings={{
        icon: (props) => <IconSymbol size={28} name={getIconForOS(props.name) as any} color={paperTheme.colors.primary} />,
      }}>
      <NavigationThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
