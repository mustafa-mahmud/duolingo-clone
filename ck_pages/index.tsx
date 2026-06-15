import { Text, View, ScrollView, Pressable } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { borderRadius } from '@/theme/borderRadius';

// Pressed state styles for buttons (per AGENTS.md: use StyleSheet/inline for Pressable)
const buttonPressedStyles = {
  primary: {
    backgroundColor: colors.primaryDark,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  secondary: {
    backgroundColor: colors.secondaryDark,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  error: {
    backgroundColor: colors.errorDark,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  warning: {
    backgroundColor: colors.warningDark,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  purple: {
    backgroundColor: colors.purpleDark,
    borderBottomWidth: 0,
    marginTop: 4,
  },
  outline: {
    backgroundColor: colors.surface,
    borderBottomWidth: 0,
    marginTop: 4,
  },
} as const;

// Color palette section
function ColorPalette() {
  const colorGroups = [
    {
      label: 'Primary',
      items: [
        { name: 'primary', hex: colors.primary },
        { name: 'primaryDark', hex: colors.primaryDark },
        { name: 'primaryLight', hex: colors.primaryLight },
      ],
    },
    {
      label: 'Secondary',
      items: [
        { name: 'secondary', hex: colors.secondary },
        { name: 'secondaryDark', hex: colors.secondaryDark },
        { name: 'secondaryLight', hex: colors.secondaryLight },
      ],
    },
    {
      label: 'Error',
      items: [
        { name: 'error', hex: colors.error },
        { name: 'errorDark', hex: colors.errorDark },
        { name: 'errorLight', hex: colors.errorLight },
      ],
    },
    {
      label: 'Warning',
      items: [
        { name: 'warning', hex: colors.warning },
        { name: 'warningDark', hex: colors.warningDark },
        { name: 'warningLight', hex: colors.warningLight },
      ],
    },
    {
      label: 'Purple',
      items: [
        { name: 'purple', hex: colors.purple },
        { name: 'purpleDark', hex: colors.purpleDark },
        { name: 'purpleLight', hex: colors.purpleLight },
      ],
    },
    {
      label: 'Neutral',
      items: [
        { name: 'white', hex: colors.white },
        { name: 'surface', hex: colors.surface },
        { name: 'border', hex: colors.border },
        { name: 'swan', hex: colors.swan },
      ],
    },
    {
      label: 'Text',
      items: [
        { name: 'textPrimary', hex: colors.textPrimary },
        { name: 'textSecondary', hex: colors.textSecondary },
        { name: 'textTertiary', hex: colors.textTertiary },
      ],
    },
  ];

  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        🎨 Color Palette
      </Text>
      {colorGroups.map((group) => (
        <View key={group.label} className="mb-4">
          <Text style={typography.bodySm} className="text-text-secondary mb-2">
            {group.label}
          </Text>
          <View className="flex-row gap-2">
            {group.items.map((item) => (
              <View key={item.name} className="items-center">
                <View
                  className="w-14 h-14 items-center justify-center"
                  style={{
                    backgroundColor: item.hex,
                    borderRadius: borderRadius.md,
                    borderWidth: item.hex === colors.white ? 1 : 0,
                    borderColor:
                      item.hex === colors.white ? colors.border : 'transparent',
                  }}
                >
                  <Text
                    style={typography.caption}
                    className={
                      item.hex === colors.white ||
                      item.hex === colors.warningLight
                        ? 'text-text-primary'
                        : 'text-white'
                    }
                  >
                    {item.hex}
                  </Text>
                </View>
                <Text
                  style={typography.caption}
                  className="text-text-tertiary mt-1"
                >
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

// Typography section
function TypographyScale() {
  const presets = [
    { name: 'headingXl', style: typography.headingXl },
    { name: 'headingLg', style: typography.headingLg },
    { name: 'headingMd', style: typography.headingMd },
    { name: 'headingSm', style: typography.headingSm },
    { name: 'bodyLg', style: typography.bodyLg },
    { name: 'bodyMd', style: typography.bodyMd },
    { name: 'bodySm', style: typography.bodySm },
    { name: 'caption', style: typography.caption },
  ];

  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        ✏️ Typography Scale
      </Text>
      <Text style={typography.bodySm} className="text-text-secondary mb-3">
        Font Family: Poppins (Regular / Medium / SemiBold / Bold)
      </Text>
      {presets.map((preset) => (
        <View
          key={preset.name}
          className="mb-2 flex-row items-baseline justify-between"
        >
          <Text style={preset.style} className="text-text-primary flex-1">
            {preset.name}
          </Text>
          <Text style={typography.caption} className="text-text-tertiary">
            {preset.style.fontSize}px / {preset.style.fontWeight}
          </Text>
        </View>
      ))}
    </View>
  );
}

// Spacing section
function SpacingScale() {
  const tokens = [
    { name: 'xs', value: spacing.xs },
    { name: 'sm', value: spacing.sm },
    { name: 'md', value: spacing.md },
    { name: 'lg', value: spacing.lg },
    { name: 'xl', value: spacing.xl },
    { name: '2xl', value: spacing['2xl'] },
    { name: '3xl', value: spacing['3xl'] },
  ];

  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        📏 Spacing Scale
      </Text>
      {tokens.map((token) => (
        <View key={token.name} className="mb-2 flex-row items-center">
          <View
            className="h-3"
            style={{
              width: token.value,
              backgroundColor: colors.primary,
              borderRadius: borderRadius.sm,
            }}
          />
          <Text style={typography.bodySm} className="text-text-secondary ml-2">
            {token.name}: {token.value}px
          </Text>
        </View>
      ))}
    </View>
  );
}

// Border Radius section
function BorderRadiusScale() {
  const tokens = [
    { name: 'sm', value: borderRadius.sm },
    { name: 'md', value: borderRadius.md },
    { name: 'lg', value: borderRadius.lg },
    { name: 'xl', value: borderRadius.xl },
    { name: 'full', value: borderRadius.full },
  ];

  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        🔘 Border Radius
      </Text>
      <View className="flex-row gap-3 items-end">
        {tokens.map((token) => (
          <View key={token.name} className="items-center">
            <View
              className="w-14 h-14 bg-primary"
              style={{ borderRadius: Math.min(token.value, 28) }}
            />
            <Text
              style={typography.caption}
              className="text-text-tertiary mt-1"
            >
              {token.name}: {token.value === 9999 ? '∞' : `${token.value}px`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// Buttons section - demonstrating BEM utilities with Pressable pressed states
function ButtonShowcase() {
  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        🔘 Buttons (BEM Utilities)
      </Text>
      <Text style={typography.bodySm} className="text-text-secondary mb-3">
        Duolingo-style buttons with 4px bottom-border shadow. Press to see
        active state.
      </Text>

      <View className="gap-3">
        <Pressable
          className="btn--primary"
          style={({ pressed }) =>
            pressed ? buttonPressedStyles.primary : undefined
          }
        >
          <Text className="text-white font-poppins-bold text-body-md text-center">
            Primary Button
          </Text>
        </Pressable>

        <Pressable
          className="btn--secondary"
          style={({ pressed }) =>
            pressed ? buttonPressedStyles.secondary : undefined
          }
        >
          <Text className="text-white font-poppins-bold text-body-md text-center">
            Secondary Button
          </Text>
        </Pressable>

        <Pressable
          className="btn--error"
          style={({ pressed }) =>
            pressed ? buttonPressedStyles.error : undefined
          }
        >
          <Text className="text-white font-poppins-bold text-body-md text-center">
            Error Button
          </Text>
        </Pressable>

        <Pressable
          className="btn--warning"
          style={({ pressed }) =>
            pressed ? buttonPressedStyles.warning : undefined
          }
        >
          <Text className="text-text-primary font-poppins-bold text-body-md text-center">
            Warning Button
          </Text>
        </Pressable>

        <Pressable
          className="btn--purple"
          style={({ pressed }) =>
            pressed ? buttonPressedStyles.purple : undefined
          }
        >
          <Text className="text-white font-poppins-bold text-body-md text-center">
            Purple Button
          </Text>
        </Pressable>

        <Pressable
          className="btn--outline"
          style={({ pressed }) =>
            pressed ? buttonPressedStyles.outline : undefined
          }
        >
          <Text className="text-text-secondary font-poppins-bold text-body-md text-center">
            Outline Button
          </Text>
        </Pressable>

        <Pressable className="btn--disabled" disabled>
          <Text className="text-white font-poppins-bold text-body-md text-center">
            Disabled Button
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// Cards section
function CardShowcase() {
  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        🃏 Cards
      </Text>
      <View className="gap-3">
        <View className="card">
          <Text style={typography.bodyMd} className="text-text-primary">
            Default Card — white bg, rounded-lg, shadow
          </Text>
        </View>
        <View className="card--surface">
          <Text style={typography.bodyMd} className="text-text-primary">
            Surface Card — surface bg, rounded-lg
          </Text>
        </View>
        <View className="card--bordered">
          <Text style={typography.bodyMd} className="text-text-primary">
            Bordered Card — white bg, border, rounded-lg
          </Text>
        </View>
      </View>
    </View>
  );
}

// Badges section
function BadgeShowcase() {
  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        🏷️ Badges
      </Text>
      <View className="flex-row gap-2">
        <View className="badge--primary">
          <Text className="text-white font-poppins-bold text-caption">
            Primary
          </Text>
        </View>
        <View className="badge--secondary">
          <Text className="text-white font-poppins-bold text-caption">
            Secondary
          </Text>
        </View>
        <View className="badge--error">
          <Text className="text-white font-poppins-bold text-caption">
            Error
          </Text>
        </View>
        <View className="badge--warning">
          <Text className="text-text-primary font-poppins-bold text-caption">
            Warning
          </Text>
        </View>
        <View className="badge--purple">
          <Text className="text-white font-poppins-bold text-caption">
            Purple
          </Text>
        </View>
      </View>
    </View>
  );
}

// Progress Bar section
function ProgressBarShowcase() {
  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        📊 Progress Bars
      </Text>
      <View className="gap-3">
        <View>
          <Text style={typography.caption} className="text-text-secondary mb-1">
            Primary (60%)
          </Text>
          <View className="progress-bar">
            <View className="progress-bar__fill" style={{ width: '60%' }} />
          </View>
        </View>
        <View>
          <Text style={typography.caption} className="text-text-secondary mb-1">
            Secondary (40%)
          </Text>
          <View className="progress-bar">
            <View
              className="progress-bar__fill--secondary"
              style={{ width: '40%' }}
            />
          </View>
        </View>
        <View>
          <Text style={typography.caption} className="text-text-secondary mb-1">
            Error (20%)
          </Text>
          <View className="progress-bar">
            <View
              className="progress-bar__fill--error"
              style={{ width: '20%' }}
            />
          </View>
        </View>
        <View>
          <Text style={typography.caption} className="text-text-secondary mb-1">
            Warning (80%)
          </Text>
          <View className="progress-bar">
            <View
              className="progress-bar__fill--warning"
              style={{ width: '80%' }}
            />
          </View>
        </View>
        <View>
          <Text style={typography.caption} className="text-text-secondary mb-1">
            Purple (50%)
          </Text>
          <View className="progress-bar">
            <View
              className="progress-bar__fill--purple"
              style={{ width: '50%' }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

// Input fields section
function InputShowcase() {
  return (
    <View className="mb-8">
      <Text style={typography.headingMd} className="text-text-primary mb-4">
        📝 Input Fields
      </Text>
      <View className="gap-3">
        <View className="input">
          <Text style={typography.bodyMd} className="text-text-tertiary">
            Default Input
          </Text>
        </View>
        <View className="input--focused">
          <Text style={typography.bodyMd} className="text-text-primary">
            Focused Input
          </Text>
        </View>
        <View className="input--error">
          <Text style={typography.bodyMd} className="text-error">
            Error Input
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.surface }}
      contentContainerStyle={{ padding: spacing.lg }}
    >
      <Text style={typography.headingXl} className="text-text-primary mb-2">
        🐦 Duolingo Clone
      </Text>
      <Text style={typography.bodyMd} className="text-text-secondary mb-6">
        Design System — Theme Tokens & BEM Utilities
      </Text>

      <ColorPalette />
      <TypographyScale />
      <SpacingScale />
      <BorderRadiusScale />
      <ButtonShowcase />
      <CardShowcase />
      <BadgeShowcase />
      <ProgressBarShowcase />
      <InputShowcase />
    </ScrollView>
  );
}
