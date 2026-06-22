import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
}: VerificationModalProps) {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  const hasCompletedRef = useRef(false);

  // Reset code and guard when modal opens
  useEffect(() => {
    if (visible) {
      setCode('');
      hasCompletedRef.current = false;
      // Auto-focus with a small delay to ensure modal is fully rendered
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible]);

  useEffect(() => {
    if (code.length === 6 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      Keyboard.dismiss();
      onVerify(code);
    }
  }, [code, onVerify]);

  const handleCodeChange = (text: string) => {
    // Only allow digits
    const digits = text.replace(/[^0-9]/g, '');
    if (digits.length <= 6) {
      setCode(digits);
    }
  };

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  const codeLength = code.length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'flex-end' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Overlay */}
        <Pressable className="absolute inset-0 bg-overlay" onPress={onClose} />

        {/* Modal Card */}
        <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10">
          {/* Close Button */}
          <Pressable
            className="absolute top-4 right-4 w-8 h-8 items-center justify-center"
            onPress={onClose}
          >
            <Ionicons name="close" size={24} color="#AFAFAF" />
          </Pressable>

          {/* Email Icon */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-surface rounded-full items-center justify-center">
              <Ionicons name="mail-outline" size={32} color="#58CC02" />
            </View>
          </View>

          {/* Heading */}
          <Text className="heading-md text-text-primary text-center mb-2">
            Check your email
          </Text>

          {/* Description */}
          <Text className="body-md text-text-secondary text-center mb-2">
            {"We've sent a verification code to"}
          </Text>
          <Text className="body-md font-poppins-bold text-text-primary text-center mb-8">
            {email}
          </Text>

          {/* Hidden TextInput for OTP */}
          <TextInput
            ref={inputRef}
            className="absolute opacity-0 h-0 w-0"
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            caretHidden
            autoFocus={false}
          />

          {/* Code Input Boxes */}
          <Text className="body-sm font-poppins-bold text-text-secondary mb-2">
            VERIFICATION CODE
          </Text>
          <Pressable
            className="flex-row justify-between mb-8"
            onPress={handleBoxPress}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const isFilled = index < codeLength;
              const isActive = index === codeLength;

              return (
                <View
                  key={index}
                  className={`w-12 h-14 bg-white border-2 rounded-lg items-center justify-center ${
                    isActive
                      ? 'border-primary'
                      : isFilled
                        ? 'border-primary'
                        : 'border-border'
                  }`}
                >
                  <Text
                    className={`heading-lg ${
                      isFilled ? 'text-text-primary' : 'text-text-tertiary'
                    }`}
                  >
                    {isFilled ? code[index] : '-'}
                  </Text>
                </View>
              );
            })}
          </Pressable>

          {/* Resend Link */}
          <View className="flex-row justify-center">
            <Text className="body-sm text-text-secondary">
              {"Didn't receive the code?"}{' '}
            </Text>
            <Pressable>
              <Text className="body-sm font-poppins-bold text-primary">
                RESEND
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
