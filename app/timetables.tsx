import { StatusBar } from 'expo-status-bar';
import React from 'react';
 import { Text, View } from 'react-native';

export default function TimeTable() {
  return (
   <View className="flex-1 items-center justify-center">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}