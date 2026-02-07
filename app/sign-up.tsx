import { IconSymbol } from '@/components/ui/icon-symbol';
import { Input } from '@/components/ui/input';
import { getTextMapping } from '@/constants/text/textMappings';
import { createPaperTheme } from '@/constants/themes/colors';
import { useAuth } from '@/contexts/auth-context';
import { getIconForOS } from '@/utils/get-icon-for-os';
import { validateSignUp } from '@/utils/auth-validation';
import { Link, router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, PaperProvider, Text, TextInput } from 'react-native-paper';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  // Always use dark theme for sign-up screen
  const darkTheme = useMemo(() => createPaperTheme('dark'), []);

  const handleSignUp = async () => {
    const validation = validateSignUp(email, password);

    if (!validation.isValid) {
      Alert.alert(
        getTextMapping('auth.alerts.error'),
        getTextMapping(validation.error || 'auth.validation.allFieldsRequired')
      );
      return;
    }

    setLoading(true);
    const { error } = await signUp(email.trim(), password);
    setLoading(false);

    if (error) {
      Alert.alert(
        getTextMapping('auth.alerts.signUpFailed'),
        error.message
      );
    } else {
      Alert.alert(
        getTextMapping('auth.alerts.success'),
        getTextMapping('auth.alerts.signUpSuccess'),
        [
          {
            text: getTextMapping('auth.alerts.ok'),
            onPress: () => router.replace('/sign-in'),
          },
        ]
      );
    }
  };

  return (
    <PaperProvider theme={darkTheme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
          <View style={styles.content}>
            <Text variant="headlineLarge" style={[styles.title, { color: darkTheme.colors.onBackground }]}>
              {getTextMapping('auth.signUp.title')}
            </Text>
            <Text variant="titleMedium" style={[styles.subtitle, { color: darkTheme.colors.onBackground }]}>
              {getTextMapping('auth.signUp.subtitle')}
            </Text>

            <View style={styles.form}>
              <Input
                label={getTextMapping('auth.signUp.emailPlaceholder')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
                editable={!loading}
              />

              <Input
                label={getTextMapping('auth.signUp.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                autoComplete="password-new"
                editable={!loading}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <IconSymbol
                        name={getIconForOS(passwordVisible ? 'eye' : 'eyeOff') as any}
                        size={24}
                        color={darkTheme.colors.onSurfaceVariant}
                      />
                    )}
                    onPress={() => setPasswordVisible((prev) => !prev)}
                  />
                }
              />

              <Button
                mode="contained"
                onPress={handleSignUp}
                loading={loading}
                disabled={loading}
                buttonColor={darkTheme.colors.primary}
                textColor={darkTheme.colors.onPrimary}
                style={styles.button}>
                {getTextMapping('auth.signUp.button')}
              </Button>

              <View style={styles.linkContainer}>
                <Text variant="bodyMedium" style={{ color: darkTheme.colors.onBackground }}>
                  {getTextMapping('auth.signUp.hasAccount')}{' '}
                </Text>
                <Link href="/sign-in" asChild>
                  <Button mode="text" compact textColor={darkTheme.colors.primary}>
                    {getTextMapping('auth.signUp.signInLink')}
                  </Button>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
});
