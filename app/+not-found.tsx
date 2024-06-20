import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <View className="flex flex-1 items-center justify-center bg-background">
        <Text className='text-5xl font-bold text-text'>Oops</Text>
        <Text className='text-text font-semibold my-3 text-2xl'>This screen doesn't exist.</Text>
        <Link href="/" className='text-text underline'>
          <Text className='text-xl font-extralight'>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
