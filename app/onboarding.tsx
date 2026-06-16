import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';

const greetings = [
  {
    text: 'Hello',
    color: '#58CC02',
    darkColor: '#46A302',
    top: 100,
    left: 20,
  },
  {
    text: '¡Hola!',
    color: '#1CB0F6',
    darkColor: '#1899D6',
    top: 40,
    right: 30,
  },
  {
    text: 'こんにちは',
    color: '#FF4B4B',
    darkColor: '#EA2B2B',
    bottom: 30,
    right: 10,
  },
];

const GreetingBubble = ({
  text,
  color,
  darkColor,
  top,
  left,
  right,
  bottom,
}: {
  text: string;
  color: string;
  darkColor: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        backgroundColor: color,
        borderBottomWidth: 3,
        borderBottomColor: darkColor,
        borderRadius: 9999,
        paddingHorizontal: 14,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 14,
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const Onboarding = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-1 items-center justify-between p-4">
        {/* Top Logo & Text Section */}
        <View className="items-center pt-3xl">
          <View className="flex-row items-center">
            <Image
              source={images.moscotLogo}
              className="w-12 h-12"
              resizeMode="contain"
            />
            <Text className="heading-md text-fuchsia-700 ml-sm">muolingo</Text>
          </View>
          <Text className="heading-md text-text-primary mt-md">
            Your AI Language <Text className="text-fuchsia-700">Teacher.</Text>
          </Text>
          <Text className="body-sm text-text-secondary mt-xs text-center">
            Real conversations with AI characters anywhere, anytimes.
          </Text>
        </View>

        {/* Center Content - Mascot Image with Greeting Bubbles */}
        <View className="flex-1 items-center justify-center p-4 relative">
          <View className="p-5">
            {greetings.map((greeting, index) => (
              <GreetingBubble
                key={index}
                text={greeting.text}
                color={greeting.color}
                darkColor={greeting.darkColor}
                top={greeting.top}
                left={greeting.left}
                right={greeting.right}
                bottom={greeting.bottom}
              />
            ))}
            <Image
              source={images.mascotWelcome}
              className="w-[300] h-[300]"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Bottom Button */}
        <View className="w-full px-xl">
          <Pressable
            className="btn--purple items-center justify-center"
            style={({ pressed }) => [
              pressed && {
                borderBottomWidth: 2,
                transform: [{ translateY: 2 }],
              },
            ]}
            onPress={() => {}}
          >
            <Text className="font-poppins-bold text-white text-[12px] text-center items-center">
              GET STARTED
              <Ionicons
                name="chevron-forward-outline"
                size={12}
                color="white"
              />
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
