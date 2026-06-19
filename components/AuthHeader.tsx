import { View, Text, Image } from 'react-native';
import { images } from '@/constants/images';

type AuthHeaderProps = {
  heading: string;
  subheading: string;
};

export function AuthHeader({ heading, subheading }: AuthHeaderProps) {
  return (
    <>
      {/* Logo + Brand */}
      <View className="items-center mb-6">
        <Image
          source={images.moscotLogo}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="heading-md text-fuchsia-700 mt-1">muolingo</Text>
      </View>

      {/* Mascot */}
      <View className="items-center mb-6">
        <Image
          source={images.mascotAuth}
          className="w-56 h-56"
          resizeMode="contain"
        />
      </View>

      {/* Heading */}
      <Text className="heading-lg text-text-primary text-center mb-1">
        {heading}
      </Text>
      <Text className="body-md text-text-secondary text-center mb-8">
        {subheading}
      </Text>
    </>
  );
}
