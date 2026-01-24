import { getTextMapping } from '@/constants/text/textMappings';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from '@/contexts/theme-context';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Menu, Text, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const paperTheme = usePaperTheme();
  const appName = Constants.expoConfig?.name || 'App Name';
  const appVersion = Constants.expoConfig?.version || '?.?.?';
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      getTextMapping('settings.logout'),
      getTextMapping('settings.logoutConfirm'),
      [
        { text: getTextMapping('settings.cancel'), style: 'cancel' },
        {
          text: getTextMapping('settings.logout'),
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/sign-in');
          },
        },
      ]
    );
  };

  const handleThemeSelect = async (selectedTheme: 'light' | 'dark') => {
    if (selectedTheme !== themeMode) {
      setMenuVisible(false);
      await setThemeMode(selectedTheme);
    } else {
      setMenuVisible(false);
    }
  };

  const getThemeLabel = () => {
    if (themeMode === 'light') return getTextMapping('settings.themeLight');
    if (themeMode === 'dark') return getTextMapping('settings.themeDark');
    return getTextMapping('settings.themeSystem');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            {getTextMapping('settings.title')}
          </Text>

          <View style={styles.section}>
            <Card
              style={[styles.card, { backgroundColor: paperTheme.colors.surfaceVariant }]}
              mode="elevated">
              <Card.Content>
                <View style={styles.settingRow}>
                  <Text variant="bodyLarge">{getTextMapping('settings.theme')}</Text>
                  <Menu
                    key={`theme-menu-${themeMode}`}
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                      <Button
                        mode="outlined"
                        onPress={() => setMenuVisible((prev) => !prev)}
                        contentStyle={styles.menuButtonContent}
                        style={styles.menuButton}>
                        {getThemeLabel()}
                      </Button>
                    }>
                    <Menu.Item
                      onPress={() => handleThemeSelect('light')}
                      title={getTextMapping('settings.themeLight')}
                      leadingIcon="sun"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={() => handleThemeSelect('dark')}
                      title={getTextMapping('settings.themeDark')}
                      leadingIcon="moon"
                    />
                  </Menu>
                </View>
              </Card.Content>
            </Card>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleLogout}
            buttonColor="#cc3333"
            textColor="#ffffff"
            style={styles.logoutButton}>
            {getTextMapping('settings.logout')}
          </Button>
          <View style={styles.appInfo}>
            <Text variant="bodySmall" style={styles.appInfoText}>
              {appName} © {new Date().getFullYear()}
            </Text>
            <Text variant="bodySmall" style={styles.versionText}>
              Version {appVersion}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 8,
  },
  section: {
    marginTop: 32,
  },
  card: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    minWidth: 120,
    borderRadius: 10,
  },
  menuButtonContent: {
    flexDirection: 'row-reverse',
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    marginBottom: 24,
  },
  appInfo: {
    alignItems: 'center',
    gap: 4,
  },
  appInfoText: {
    opacity: 0.7,
  },
  versionText: {
    opacity: 0.5,
  }
});
