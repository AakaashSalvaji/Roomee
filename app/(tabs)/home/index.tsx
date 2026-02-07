import { getTextMapping } from '@/constants/text/textMappings';
import { useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { router } from 'expo-router';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.content}>
          <Text variant="headlineMedium">{getTextMapping('home.title')}</Text>
          <Button
            mode="contained"
            onPress={() => router.push('/home/edit-household')}
            style={styles.button}
          >
            {getTextMapping('home.newHousehold')}
          </Button>
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
  button: {
    marginTop: 24,
    width: '100%',
  },
});
