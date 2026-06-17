import { View, Text } from 'react-native';

export function AuthDivider() {
  return (
    <View className="flex-row items-center mb-6">
      <View className="flex-1 h-px bg-border" />
      <Text className="body-sm text-text-tertiary mx-4">or</Text>
      <View className="flex-1 h-px bg-border" />
    </View>
  );
}
