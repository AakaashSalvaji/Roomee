/**
 * Theme definitions (colors, spacing, typography, etc.)
 * Centralized theme colors for light and dark modes
 */

import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';

/**
 * Base color definitions for the app
 */
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f0f8ff', // Very pale light blue
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0a0e14', // Midnight blue
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/**
 * Extended theme colors for UI components
 */
export const ThemeColors = {
  light: {
    // Card and surface colors - very pale light blue
    cardBackground: '#f5fbff',
    
    // Switch colors
    switchTrackFalse: '#d0d0d0',
    switchTrackTrue: '#e0e0e0',
    switchThumb: '#f5f5f5',
    
    // Button colors
    logoutButton: '#cc3333',
    logoutButtonText: '#ffffff',
    
    // Input colors
    inputBackground: '#f0f8ff',
    inputBorder: '#e0e8f0',
    inputPlaceholder: '#687076',
    inputError: '#ff4444',
  },
  dark: {
    // Card and surface colors - midnight blue
    cardBackground: '#0f1419',
    
    // Switch colors
    switchTrackFalse: '#4a4a4a',
    switchTrackTrue: '#2a2a2a',
    switchThumb: '#1a1a1a',
    
    // Button colors
    logoutButton: '#cc3333',
    logoutButtonText: '#ffffff',
    
    // Input colors - midnight blue variants
    inputBackground: '#1a1f24',
    inputBorder: '#2a2f34',
    inputPlaceholder: '#9BA1A6',
    inputError: '#ff4444',
  },
} as const;

/**
 * Get theme color based on current theme
 */
export function getThemeColor(
  theme: 'light' | 'dark',
  colorKey: keyof typeof ThemeColors.light
): string {
  return ThemeColors[theme][colorKey];
}

/**
 * Create React Native Paper theme with custom colors
 */
export function createPaperTheme(colorScheme: 'light' | 'dark'): MD3Theme {
  const baseTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const customColors = Colors[colorScheme];
  
  // Primary color: Use tint from Colors
  // For dark mode, use teal instead of white for better contrast
  const primaryColor = colorScheme === 'dark' 
    ? '#0a7ea4' // Teal for dark mode (better than white)
    : customColors.tint; // Teal for light mode
  
  // Secondary color: Complementary shade (slightly different teal)
  const secondaryColor = colorScheme === 'dark'
    ? '#0d8bb8' // Lighter teal for dark mode
    : '#087ea4'; // Slightly darker teal for light mode
  
  // Background colors: Midnight blue (dark) and very pale light blue (light)
  const backgroundColor = colorScheme === 'dark'
    ? '#0a0e14' // Midnight blue
    : '#f0f8ff'; // Very pale light blue
  
  // Surface colors (slightly different from background)
  const surfaceColor = colorScheme === 'dark'
    ? '#0f1419' // Slightly lighter midnight blue
    : '#f5fbff'; // Slightly different pale blue
  
  // Surface variant for cards and elevated surfaces
  const surfaceVariantColor = colorScheme === 'dark'
    ? '#141920' // Even lighter midnight blue for cards
    : '#fafcff'; // Even lighter pale blue for cards
  
  // Create custom theme with primary and secondary colors from constants
  const customTheme: MD3Theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      // Primary color from Colors
      primary: primaryColor,
      // Secondary color - complementary to primary
      secondary: secondaryColor,
      // Container colors for filled buttons/inputs
      primaryContainer: colorScheme === 'dark' 
        ? 'rgba(10, 126, 164, 0.2)' 
        : 'rgba(10, 126, 164, 0.1)',
      secondaryContainer: colorScheme === 'dark'
        ? 'rgba(13, 139, 184, 0.2)'
        : 'rgba(8, 126, 164, 0.1)',
      // Text colors on primary/secondary backgrounds
      onPrimary: '#fff',
      onSecondary: '#fff',
      onPrimaryContainer: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',
      onSecondaryContainer: colorScheme === 'dark' ? '#ECEDEE' : '#11181C',
      // Use custom background colors - midnight blue (dark) and very pale light blue (light)
      background: backgroundColor,
      surface: surfaceColor,
      surfaceVariant: surfaceVariantColor,
      onBackground: customColors.text,
      onSurface: customColors.text,
      onSurfaceVariant: customColors.text,
    },
  };
  
  return customTheme;
}
