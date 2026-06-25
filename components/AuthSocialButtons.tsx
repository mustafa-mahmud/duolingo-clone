import { useSSO } from '@clerk/clerk-expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Alert, Text, Pressable } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

type SocialStrategy = 'oauth_google' | 'oauth_facebook';

function getClerkErrorMessage(error: unknown) {
  const clerkError =
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray(error.errors)
      ? error.errors[0]
      : null;

  if (clerkError?.message) {
    return String(clerkError.message);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to complete social sign in. Please try again.';
}

export function AuthSocialButtons() {
  const { startSSOFlow } = useSSO();
  const [activeStrategy, setActiveStrategy] = useState<SocialStrategy | null>(
    null,
  );

  const handleSocialSignIn = async (strategy: SocialStrategy) => {
    if (activeStrategy) {
      return;
    }

    try {
      setActiveStrategy(strategy);

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL('/oauth-callback'),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Social sign in failed', getClerkErrorMessage(error));
    } finally {
      setActiveStrategy(null);
    }
  };

  return (
    <>
      <Pressable
        className="btn--outline mb-3 flex-row items-center justify-center"
        disabled={activeStrategy !== null}
        onPress={() => handleSocialSignIn('oauth_google')}
      >
        <Ionicons name="logo-google" size={20} color="#777777" />
        <Text className="font-poppins-bold text-text-secondary text-body-md ml-2">
          CONTINUE WITH GOOGLE
        </Text>
      </Pressable>

      <Pressable
        className="btn--outline mb-8 flex-row items-center justify-center"
        disabled={activeStrategy !== null}
        onPress={() => handleSocialSignIn('oauth_facebook')}
      >
        <Ionicons name="logo-facebook" size={20} color="#777777" />
        <Text className="font-poppins-bold text-text-secondary text-body-md ml-2">
          CONTINUE WITH FACEBOOK
        </Text>
      </Pressable>
    </>
  );
}
