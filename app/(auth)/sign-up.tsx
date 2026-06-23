import { useSignUp } from '@clerk/clerk-expo';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthHeader } from '@/components/AuthHeader';
import { AuthDivider } from '@/components/AuthDivider';
import { AuthSocialButtons } from '@/components/AuthSocialButtons';
import { AuthFooter } from '@/components/AuthFooter';
import { VerificationModal } from '@/components/VerificationModal';

function getClerkErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray(error.errors) &&
    error.errors[0]?.message
  ) {
    return String(error.errors[0].message);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to create your account. Please try again.';
}

export default function SignUp() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [showVerification, setShowVerification] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateAccount = async () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (!isLoaded || !signUp || !trimmedEmail || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp.create({
        emailAddress: trimmedEmail,
        firstName: trimmedName || undefined,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setEmail(trimmedEmail);
      setShowVerification(true);
    } catch (error) {
      Alert.alert('Sign up failed', getClerkErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded || !signUp) {
      return;
    }

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setShowVerification(false);
      }
    } catch (error) {
      Alert.alert('Verification failed', getClerkErrorMessage(error));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-12 pb-8"
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader
          heading="Create a profile"
          subheading="Sign up to start learning"
        />

        {/* Name Field */}
        <View className="mb-4">
          <Text className="body-sm font-poppins-bold text-text-secondary mb-2">
            NAME
          </Text>
          <TextInput
            className="input"
            placeholder="Your name"
            placeholderTextColor="#AFAFAF"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
        </View>

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

        {/* Create Account Button */}
        <Pressable
          className="btn--primary mt-2 mb-6"
          onPress={handleCreateAccount}
          disabled={isSubmitting}
        >
          <Text className="font-poppins-bold text-white text-center text-body-md">
            CREATE ACCOUNT
          </Text>
        </Pressable>

        <AuthDivider />
        <AuthSocialButtons />

        <AuthFooter
          prompt="Already have an account?"
          action="LOG IN"
          actionRoute="/sign-in"
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
