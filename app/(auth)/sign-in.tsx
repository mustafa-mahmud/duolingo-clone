import { useSignIn } from '@clerk/clerk-expo';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthHeader } from '@/components/AuthHeader';
import { AuthDivider } from '@/components/AuthDivider';
import { AuthSocialButtons } from '@/components/AuthSocialButtons';
import { AuthFooter } from '@/components/AuthFooter';
import { VerificationModal } from '@/components/VerificationModal';

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

  return 'Unable to request a verification code. Please try again.';
}

export default function SignIn() {
  const { isLoaded, signIn } = useSignIn();
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();

    if (!isLoaded || !signIn || !trimmedEmail || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn.create({
        identifier: trimmedEmail,
        strategy: 'email_code',
      });

      setEmail(trimmedEmail);
      setShowVerification(true);
    } catch (error) {
      Alert.alert('Sign in failed', getClerkErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = useCallback(() => {
    // Sign-in verification submission will be implemented in the next step.
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-12 pb-8"
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader
          heading="Welcome back"
          subheading="Sign in to continue learning"
        />

        {/* Email Field */}
        <View className="mb-4">
          <Text className="body-sm font-poppins-bold text-text-secondary mb-2">
            EMAIL
          </Text>
          <TextInput
            className="input"
            placeholder="name@email.com"
            placeholderTextColor="#AFAFAF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Sign In Button */}
        <Pressable
          className="btn--primary mt-2 mb-6"
          onPress={handleSignIn}
          disabled={isSubmitting}
        >
          <Text className="font-poppins-bold text-white text-center text-body-md">
            SIGN IN
          </Text>
        </Pressable>

        <AuthDivider />
        <AuthSocialButtons />

        <AuthFooter
          prompt="Don't have an account?"
          action="SIGN UP"
          actionRoute="/sign-up"
        />
      </ScrollView>

      <VerificationModal
        visible={showVerification}
        email={email}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerify}
      />
    </SafeAreaView>
  );
}
