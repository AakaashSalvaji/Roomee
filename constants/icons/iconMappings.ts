/**
 * Centralized icon mappings
 * iOS uses SF Symbols, Android uses Material Icons
 * The actual icon library implementation should be handled in components
 */

/**
 * iOS icon mappings (SF Symbols)
 * See available icons: https://github.com/andrewtavis/sf-symbols-online
 */
export const IconsIOS = {
  unknown: 'questionmark.circle',
  home: 'house.fill',
  settings: 'gearshape.fill',
  explore: 'paperplane.fill',
  profile: 'person.fill',
  search: 'magnifyingglass',
  back: 'chevron.left',
  forward: 'chevron.right',
  close: 'xmark',
  menu: 'line.3.horizontal',
  add: 'plus',
  edit: 'pencil',
  delete: 'trash',
  save: 'square.and.arrow.down',
  cancel: 'xmark.circle',
  check: 'checkmark',
  warning: 'exclamationmark.triangle',
  error: 'exclamationmark.circle',
  info: 'info.circle',
  moon: 'moon.fill',
  sun: 'sun.max.fill',
  eye: 'eye.fill',
  eyeOff: 'eye.slash.fill',
} as const;

/**
 * Android icon mappings (Material Icons)
 * See available icons: https://icons.expo.fyi/
 * Filter by Material Icons
 */
export const IconsAndroid = {
  unknown: 'help',
  home: 'home',
  settings: 'settings',
  explore: 'explore',
  profile: 'person',
  search: 'search',
  back: 'arrow-back',
  forward: 'arrow-forward',
  close: 'close',
  menu: 'menu',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  save: 'save',
  cancel: 'cancel',
  check: 'check',
  warning: 'warning',
  error: 'error',
  info: 'info',
  moon: 'dark-mode',
  sun: 'sunny',
  eye: 'visibility',
  eyeOff: 'visibility-off',
} as const;

export type IconName = keyof typeof IconsIOS;
