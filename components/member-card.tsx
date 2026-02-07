import { getTextMapping } from '@/constants/text/textMappings';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type MemberCardProps = {
  displayName: string;
  role: 'admin' | 'member';
};

export function MemberCard({ displayName, role }: MemberCardProps) {
  const theme = useTheme();
  const label = role === 'admin' ? getTextMapping('manageMembers.admin') : getTextMapping('manageMembers.member');

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium">{displayName}</Text>
        <Text variant="labelMedium" style={{ color: theme.colors.primary }}>
          {label}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
