import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
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

  return 'Unable to create your account. Please try again.';
}

function getVerificationErrorMessage(error: unknown) {
  const clerkError =
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray(error.errors)
      ? error.errors[0]
      : null;
  const code = clerkError?.code ? String(clerkError.code).toLowerCase() : '';
  const message = clerkError?.message
    ? String(clerkError.message)
    : 'Unable to verify your email. Please try again.';

  if (code.includes('expired') || message.toLowerCase().includes('expired')) {
    return 'This verification code has expired. Please request a new code and try again.';
  }

  if (
    code.includes('incorrect') ||
    code.includes('invalid') ||
    message.toLowerCase().includes('incorrect') ||
    message.toLowerCase().includes('invalid')
  ) {
    return 'Invalid verification code. Please check the code and try again.';
  }

  return message;
}

export default function SignUp() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [showVerification, setShowVerification] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

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

      setVerificationError('');
      setEmail(trimmedEmail);
      setShowVerification(true);
    } catch (error) {
      Alert.alert('Sign up failed', getClerkErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded || !signUp || isVerifying) {
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationError('');

      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        setShowVerification(false);
        router.replace('/');
        return;
      }

      setVerificationError(
        'Verification is not complete yet. Please try again.',
      );
    } catch (error) {
      setVerificationError(getVerificationErrorMessage(error));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseVerification = () => {
    if (isVerifying) {
      return;
    }

    setShowVerification(false);
    setVerificationError('');
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
            {isSubmitting ? 'CREATING...' : 'CREATE ACCOUNT'}
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
        onClose={handleCloseVerification}
        onVerify={handleVerify}
        isVerifying={isVerifying}
        errorMessage={verificationError}
      />
    </SafeAreaView>
  );
}
