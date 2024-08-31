import React from 'react';
import { View, Text } from 'react-native';

const Toast = ({ message, visible }:any) => {
  if (!visible) return null;

  return (
    <View className="absolute bottom-4 left-4 right-4 bg-yellow-500 p-3 rounded-lg">
      <Text className="text-white font-semibold text-center">{message}</Text>
    </View>
  );
};

export default Toast;
