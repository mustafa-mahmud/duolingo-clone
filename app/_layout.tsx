import '../global.css';

import { ClerkLoaded, ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Keep the splash screen visible until fonts and Clerk are both ready.
SplashScreen.preventAutoHideAsync();

function InitialNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}

function ClerkReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return <InitialNavigator />;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });
  const [isClerkReady, setIsClerkReady] = useState(false);
  const handleClerkReady = useCallback(() => {
    setIsClerkReady(true);
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isClerkReady) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded, isClerkReady]);

  if (!publishableKey) {
    throw new Error(
      'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add it to your Expo environment variables.',
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        {fontsLoaded || fontError ? (
          <ClerkReady onReady={handleClerkReady} />
        ) : null}
      </ClerkLoaded>
    </ClerkProvider>
  );
}
