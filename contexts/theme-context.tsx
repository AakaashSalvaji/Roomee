import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './auth-context';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_mode';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const systemColorScheme = useRNColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage when user is logged in
  useEffect(() => {
    const loadTheme = async () => {
      if (user) {
        try {
          const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
          if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
            setThemeModeState(savedTheme as ThemeMode);
          }
        } catch (error) {
          console.error('Error loading theme:', error);
        }
      } else {
        // Reset to system when logged out
        setThemeModeState('system');
      }
      setIsLoading(false);
    };

    loadTheme();
  }, [user]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      if (user) {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  // Determine actual theme based on mode
  const theme: 'light' | 'dark' =
    themeMode === 'system' ? (systemColorScheme ?? 'light') : themeMode;

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
