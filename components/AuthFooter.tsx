import { View, Text, Pressable } from 'react-native';
import { router, type Href } from 'expo-router';

type AuthFooterProps = {
  prompt: string;
  action: string;
  actionRoute: Href;
};

export function AuthFooter({ prompt, action, actionRoute }: AuthFooterProps) {
  return (
    <View className="flex-row justify-center">
      <Text className="body-sm text-text-secondary">{prompt} </Text>
      <Pressable onPress={() => router.push(actionRoute)}>
        <Text className="body-sm font-poppins-bold text-primary">{action}</Text>
      </Pressable>
    </View>
  );
}
