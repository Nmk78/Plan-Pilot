// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { useEffect, useRef, type ComponentProps } from 'react';
import { Animated } from 'react-native';

// export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
//   return <Ionicons size={28} style={[{ marginBottom: -6 }, style]} {...rest} />;
// }

export const TabBarIcon = ({ name, color, focused }: any) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: focused ? 0 : 2, // Move icon upward by 10 units when focused
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  );
};