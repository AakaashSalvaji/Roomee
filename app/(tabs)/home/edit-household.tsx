import { Input } from '@/components/ui/input';
import { getTextMapping } from '@/constants/text/textMappings';
import { useAuth } from '@/contexts/auth-context';
import { useHouseholdForm } from '@/contexts/household-form-context';
import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditHouseholdScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { formState, setName, setHouseholdId, resetForm } = useHouseholdForm();
  const params = useLocalSearchParams<{ id?: string }>();
  const isEdit = Boolean(params.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? getTextMapping('household.editHousehold') : getTextMapping('household.createHousehold'),
    });
  }, [isEdit, navigation]);

  const [name, setNameLocal] = useState(formState.name);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (params.id) {
      setHouseholdId(params.id);
      // TODO: load household name when edit is implemented
    } else {
      resetForm();
    }
    // Only run on mount: reset form when opening create flow; avoid reset when returning from manage-members
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNameLocal(formState.name);
  }, [formState.name]);

  const memberCount = 1 + formState.memberEmails.length;

  const handleManageMembers = useCallback(() => {
    router.push('/home/manage-members');
  }, []);

  const handleSave = useCallback(async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert(getTextMapping('auth.alerts.error'), getTextMapping('household.nameRequired'));
      return;
    }
    if (!user?.id) return;

    setSaving(true);
    try {
      if (isEdit && params.id) {
        const { error } = await supabase
          .from('households')
          .update({ name: trimmedName })
          .eq('id', params.id);
        if (error) throw error;
        router.back();
      } else {
        const { data: household, error: householdError } = await supabase
          .from('households')
          .insert({ name: trimmedName })
          .select('id')
          .single();
        if (householdError) throw householdError;
        if (!household?.id) throw new Error('No household id returned');

        // Add creator to household_members as admin (user.id = auth.users.id = profiles.id)
        const { error: memberError } = await supabase.from('household_members').insert({
          household_id: household.id,
          user_id: user.id,
          role: 'admin',
        });
        if (memberError) {
          throw new Error(memberError.message);
        }

        resetForm();
        router.back();
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      Alert.alert(getTextMapping('auth.alerts.error'), message);
    } finally {
      setSaving(false);
    }
  }, [name, isEdit, params.id, user?.id, resetForm]);

  const membersCountText = getTextMapping('household.membersCount').replace('{{count}}', String(memberCount)) + (memberCount > 1 ? 's' : '');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.content}>
          <Input
            label={getTextMapping('household.namePlaceholder')}
            placeholder={getTextMapping('household.namePlaceholder')}
            value={name}
            onChangeText={(text) => {
              setNameLocal(text);
              setName(text);
            }}
            autoCapitalize="words"
          />

          <Pressable
            onPress={handleManageMembers}
            style={({ pressed }) => [
              styles.manageMembersRow,
              { backgroundColor: theme.colors.surfaceVariant },
              pressed && styles.pressed,
            ]}
          >
            <Text variant="titleMedium">{getTextMapping('household.manageMembers')}</Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {membersCountText}
            </Text>
          </Pressable>
        </View>

        <View style={[styles.footer, { borderTopColor: theme.colors.outline }]}>
          <Button
            mode="contained"
            onPress={handleSave}
            disabled={saving}
            style={styles.saveButton}
          >
            {saving ? (
              <ActivityIndicator color={theme.colors.onPrimary} />
            ) : isEdit ? (
              getTextMapping('household.save')
            ) : (
              getTextMapping('household.create')
            )}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  manageMembersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
  saveButton: {
    width: '100%',
  },
});
