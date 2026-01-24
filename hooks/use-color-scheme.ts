import { useTheme } from '@/contexts/theme-context';

/**
 * Hook to get the current color scheme
 * Uses user's theme preference if logged in, otherwise uses system theme
 */
export function useColorScheme(): 'light' | 'dark' | null {
  try {
    const { theme } = useTheme();
    return theme;
  } catch {
    // If theme context is not available (e.g., on login/signup screens), use system theme
    return null;
  }
}
