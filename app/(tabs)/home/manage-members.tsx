import { MemberCard } from '@/components/member-card';
import { Input } from '@/components/ui/input';
import { getTextMapping } from '@/constants/text/textMappings';
import { useHouseholdForm } from '@/contexts/household-form-context';
import { useAuth } from '@/contexts/auth-context';
import { validateEmail } from '@/utils/auth-validation';
import { useNavigation } from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';

export default function ManageMembersScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { formState, addMemberEmail } = useHouseholdForm();
  const [searchEmail, setSearchEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: getTextMapping('manageMembers.title'),
      headerBackTitle: getTextMapping('manageMembers.back'),
    });
  }, [navigation]);

  const adminDisplayName = user?.email ?? getTextMapping('manageMembers.admin');

  const handleAddEmail = useCallback(() => {
    const trimmed = searchEmail.trim();
    if (!trimmed) return;

    const validation = validateEmail(trimmed);
    if (!validation.isValid) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    addMemberEmail(trimmed);
    setSearchEmail('');
    Keyboard.dismiss();
  }, [searchEmail, addMemberEmail]);

  const listData = formState.memberEmails;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
      <View style={styles.content}>
        <Input
          placeholder={getTextMapping('manageMembers.searchPlaceholder')}
          value={searchEmail}
          onChangeText={(text) => {
            setSearchEmail(text);
            setEmailError(false);
          }}
          onSubmitEditing={handleAddEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={emailError}
          returnKeyType="done"
        />
        {emailError && (
          <Text variant="bodySmall" style={[styles.error, { color: theme.colors.error }]}>
            {getTextMapping('auth.validation.emailInvalid')}
          </Text>
        )}

        <View style={styles.adminSection}>
          <MemberCard displayName={adminDisplayName} role="admin" />
        </View>

        <FlatList
          data={listData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <MemberCard displayName={item} role="member" />
          )}
          ListEmptyComponent={null}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  error: {
    marginTop: -8,
    marginBottom: 8,
  },
  adminSection: {
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
});
