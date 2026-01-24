import { Platform } from 'react-native';
import { IconsIOS, IconsAndroid, type IconName } from '@/constants/icons/iconMappings';

/**
 * Gets the appropriate icon name for the current OS
 * Note: IconSymbol component expects SF Symbol names and maps them internally
 * @param iconName - The semantic icon name (e.g., 'home', 'settings')
 * @returns The SF Symbol name (iOS icons) since IconSymbol handles platform mapping
 */
export function getIconForOS(iconKey: IconName): string {
  if (Platform.OS === 'ios') {
    return IconsIOS[iconKey] ?? IconsIOS['unknown'];
  }

  return IconsAndroid[iconKey] ?? IconsAndroid['unknown'];
}  