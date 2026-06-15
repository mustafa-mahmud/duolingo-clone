// Design tokens: Colors
// Extracted from the Duolingo-style design system

export const colors = {
  // Primary - Green (Duolingo signature)
  primary: '#58CC02',
  primaryDark: '#46A302',
  primaryLight: '#89E219',

  // Secondary - Blue
  secondary: '#1CB0F6',
  secondaryDark: '#1899D6',
  secondaryLight: '#4FC3F6',

  // Error - Red
  error: '#FF4B4B',
  errorDark: '#EA2B2B',
  errorLight: '#FF7070',

  // Warning - Orange
  warning: '#FFC800',
  warningDark: '#E5A900',
  warningLight: '#FFD84D',

  // Purple
  purple: '#CE82FF',
  purpleDark: '#B566E0',
  purpleLight: '#D99BFF',

  // Gold / XP
  gold: '#FFC800',

  // Neutral backgrounds
  white: '#FFFFFF',
  surface: '#F7F7F7',
  border: '#E5E5E5',
  swan: '#DDDDDD',

  // Text
  textPrimary: '#3C3C3C',
  textSecondary: '#777777',
  textTertiary: '#AFAFAF',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ColorToken = keyof typeof colors;
