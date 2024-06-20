import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

const RootLayout = () => {
  return (
    <Stack>
      {/* <NativeBaseProvider> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="+not-found"
          options={{
            title: "",
          }}
        />
      {/* </NativeBaseProvider> */}
    </Stack>
  );
};

export default RootLayout;
