import { Text, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function AuthSocialButtons() {
  return (
    <>
      <Pressable className="btn--outline mb-3 flex-row items-center justify-center">
        <Ionicons name="logo-google" size={20} color="#777777" />
        <Text className="font-poppins-bold text-text-secondary text-body-md ml-2">
          CONTINUE WITH GOOGLE
        </Text>
      </Pressable>

      <Pressable className="btn--outline mb-8 flex-row items-center justify-center">
        <Ionicons name="logo-facebook" size={20} color="#777777" />
        <Text className="font-poppins-bold text-text-secondary text-body-md ml-2">
          CONTINUE WITH FACEBOOK
        </Text>
      </Pressable>
    </>
  );
}
