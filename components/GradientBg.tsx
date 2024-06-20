import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

type GradientHeaderProps = {
  scrollOffset: Animated.SharedValue<number>;
  headerBackgroundColor: { dark: string; light: string };
};

const HEADER_HEIGHT = 300;

// export default function GradientHeader({ scrollOffset, headerBackgroundColor }: GradientHeaderProps) {
export default function GradientHeader() {



  return (
    <Animated.View style={[styles.header]}>
      <LinearGradient
        colors={['#fafafa', "#006281"]}
        style={styles.gradient}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    width: '100%',
  },
  gradient: {
    height: HEADER_HEIGHT,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
