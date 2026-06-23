import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

const Home = () => {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      await signOut();
      router.replace('/onboarding');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-cente">
      <Text className="heading-xl text-white">Home</Text>
      <Pressable
        className="btn--outline mt-xl"
        style={({ pressed }) => [
          pressed && {
            transform: [{ translateY: 1 }],
          },
        ]}
        onPress={handleLogout}
        disabled={isSigningOut}
      >
        <Text className="font-poppins-bold text-text-secondary text-body-md text-center">
          {isSigningOut ? 'Logging out...' : 'Log out'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Home;
