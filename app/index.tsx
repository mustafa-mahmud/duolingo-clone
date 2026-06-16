import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="heading-xl text-white">Home</Text>
      <Pressable
        className="btn--outline mt-xl"
        style={({ pressed }) => [
          pressed && {
            transform: [{ translateY: 1 }],
          },
        ]}
        onPress={() => router.push('/onboarding')}
      >
        <Text className="font-poppins-bold text-text-secondary text-body-md text-center">
          Go to Onboarding
        </Text>
      </Pressable>
    </View>
  );
};

export default Home;
