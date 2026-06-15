// Design tokens: Typography
// Font family: Poppins with size/weight hierarchy

export const fontFamilies = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const fontSizes = {
  // Headings
  headingXl: 30,
  headingLg: 24,
  headingMd: 20,
  headingSm: 18,

  // Body
  bodyLg: 18,
  bodyMd: 16,
  bodySm: 14,

  // Caption
  caption: 12,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
} as const;

export const lineHeights = {
  tight: 1.1,
  normal: 1.3,
  relaxed: 1.5,
} as const;

// Typography presets combining size + weight + line-height
export const typography = {
  headingXl: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.headingXl,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  headingLg: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.headingLg,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
  },
  headingMd: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.headingMd,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.normal,
  },
  headingSm: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.headingSm,
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.normal,
  },
  bodyLg: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.bodyLg,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
  },
  bodyMd: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.bodyMd,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed,
  },
  bodySm: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.bodySm,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed,
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed,
  },
} as const;

export type TypographyPreset = keyof typeof typography;
export type FontSizeToken = keyof typeof fontSizes;
