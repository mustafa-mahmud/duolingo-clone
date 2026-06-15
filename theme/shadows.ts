// Design tokens: Shadows
// Duolingo uses characteristic bottom-border shadows on buttons
// and standard drop shadows on cards

export const shadows = {
  // Standard drop shadows
  small: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  // Duolingo-style button bottom border shadows
  // These are simulated via border-b-4 with a darker color variant
  buttonPrimary: {
    borderBottomColor: '#46A302', // primaryDark
    borderBottomWidth: 4,
  },
  buttonSecondary: {
    borderBottomColor: '#1899D6', // secondaryDark
    borderBottomWidth: 4,
  },
  buttonError: {
    borderBottomColor: '#EA2B2B', // errorDark
    borderBottomWidth: 4,
  },
  buttonWarning: {
    borderBottomColor: '#E5A900', // warningDark
    borderBottomWidth: 4,
  },
  buttonPurple: {
    borderBottomColor: '#B566E0', // purpleDark
    borderBottomWidth: 4,
  },
} as const;

export type ShadowToken = keyof typeof shadows;
