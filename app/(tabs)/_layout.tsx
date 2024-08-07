// import { Tabs } from 'expo-router';
// import React from 'react';

// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Text, StyleSheet, View, Image, Animated } from "react-native";
import { NativeBaseProvider } from "native-base";
import { TransitionPresets } from "@react-navigation/stack"; // Import TransitionPresets

const TabLayout = () => {

  const TabBarLabel = ({ focused , label }:any) => {
    if(!focused){
      return
    } 
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: focused ? 1 : 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [focused]);
  
    return (
      <Animated.Text style={[styles.tabLabel, { opacity: fadeAnim }]}>
        {label}
      </Animated.Text>
    );
  };

  return (
    <NativeBaseProvider>
      <Tabs
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS, // Apply transition preset
          tabBarInactiveBackgroundColor: "#031430",
          tabBarActiveBackgroundColor: "#031430",
          tabBarInactiveTintColor: "#fafafa",
          tabBarActiveTintColor: "#0066ff",
          headerShown: false,
          tabBarStyle: {
            height: 60,
            
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? <Text style={styles.tabLabel}>Home</Text> : null,
          }}
        />
        <Tabs.Screen
          name="tables"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
                

              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? <Text style={styles.tabLabel}>Schedules</Text> : null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
                

              />
            ),
            tabBarLabel: ({ focused }) =>
              focused ? <Text style={styles.tabLabel}>Profile</Text> : null,
          }}
        />
      </Tabs>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingTop: 10,
  },
  tabLabel: {
    color: "#e7eafd",
    marginBottom: 4,
  },
});

export default TabLayout;
