import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View className="bg-red-500 sm:bg-green-500 md:bg-blue-500 p-5">
        <Text className="text-white">Responsive test</Text>
      </View>
    </View>
  );
}
