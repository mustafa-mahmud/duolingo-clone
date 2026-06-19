import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthHeader } from '@/components/AuthHeader';
import { AuthDivider } from '@/components/AuthDivider';
import { AuthSocialButtons } from '@/components/AuthSocialButtons';
import { AuthFooter } from '@/components/AuthFooter';
import { VerificationModal } from '@/components/VerificationModal';

export default function SignIn() {
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');

  const handleSignIn = () => {
    if (email.trim()) {
      setShowVerification(true);
    }
  };

  const handleVerify = (code: string) => {
    // Verification handled internally by VerificationModal
    console.log('Verification code:', code);
  };

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
        <Pressable className="btn--primary mt-2 mb-6" onPress={handleSignIn}>
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
