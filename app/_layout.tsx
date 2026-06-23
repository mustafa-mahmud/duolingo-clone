import '../global.css';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isPlaceholderPublishableKey =
  publishableKey === 'pk_test_your_publishable_key_here';

if (!publishableKey || isPlaceholderPublishableKey) {
  console.error(
    '[Clerk] Invalid EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Replace the placeholder in .env.local with your real Clerk publishable key.',
  );
}

// Keep the splash screen visible until fonts are ready.
SplashScreen.preventAutoHideAsync();

function RootNavigation({ fontsReady }: { fontsReady: boolean }) {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (fontsReady && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady, isLoaded]);

  if (!fontsReady || !isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
  const fontsReady = fontsLoaded || Boolean(fontError);

  return (
    <ClerkProvider
      publishableKey={publishableKey ?? ''}
      tokenCache={tokenCache}
    >
      <RootNavigation fontsReady={fontsReady} />
    </ClerkProvider>
  );
}
