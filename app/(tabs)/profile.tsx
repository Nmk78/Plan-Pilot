// import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Home from ".";
// import { TimelineComponent } from "@/components/Timeline"; // Adjust the path as needed

// const Tab = createMaterialTopTabNavigator();

// const ProfileComponent = () => {
//   return (
//     <SafeAreaView className="bg-background flex flex-1">
//       <View className="w-full h-52 justify-center items-center mt-6 pb-5 border-b-[0.5px] border-text">
//         <Image
//           source={require("../../assets/images/adaptive-icon.png")}
//           className="w-40 h-40 rounded-full"
//         />
//         <Text className="text-text text-3xl font-semibold mt-3">
//           Nay Myo Khant
//         </Text>
//       </View>
//       <ScrollView className="flex flex-1">
//         <Tab.Navigator
//           screenOptions={{
//             tabBarStyle: styles.tabBar,
//             tabBarLabelStyle: styles.tabBarLabel,
//             tabBarIndicatorStyle: styles.tabBarIndicator,
//           }}
//         >
//           <Tab.Screen name="Subjects" component={Home} />
//           <Tab.Screen name="Timetables" component={TimelineComponent} />
//         </Tab.Navigator>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "#031430",
//   },
//   tabBarLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fafafa", // Tab bar label color
//   },
//   tabBarIndicator: {
//     backgroundColor: "#000", // Tab bar indicator color
//     height: 4, // Tab bar indicator height
//   },
// });

// export default ProfileComponent;

import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import Home from "."; // Adjust the path as needed
import { TimelineComponent } from "@/components/Timeline"; // Adjust the path as needed

const Tab = createMaterialTopTabNavigator();

const ProfileComponent = () => {
  return (
    <SafeAreaView className="bg-background flex flex-1">
      <View className="w-full h-60 justify-center items-center mt-12 pb-3 border-b-[0.5px] border-text">
        <Image
          source={require("../../assets/images/adaptive-icon.png")}
          className="w-40 h-40 rounded-full"
        />
        <Text className="text-text text-3xl font-semibold mt-3">
          Nay Myo Khant
        </Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabBarIndicator,
        }}
      >
        <Tab.Screen name="Subjects" component={Home} />
        <Tab.Screen name="Timetables" component={TimelineComponent} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#031430",
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fafafa", // Tab bar label color
  },
  tabBarIndicator: {
    backgroundColor: "#0066ff", // Tab bar indicator color
    height: 2, // Tab bar indicator height
  },
});

export default ProfileComponent;
