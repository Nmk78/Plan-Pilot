// import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// // import Home from "./Home"; // Adjust the path as needed
// import { TimelineComponent } from "@/components/Timeline"; // Adjust the path as needed

// const Tab = createMaterialTopTabNavigator();

// const ProfileComponent = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.profileHeader}>
//           <Image
//             source={require("../../assets/images/adaptive-icon.png")}
//             style={styles.profileImage}
//           />
//           <Text style={styles.profileName}>Nay Myo Khant</Text>
//         </View>
//         <Tab.Navigator>
//         //   <Tab.Screen name="Subjects" component={Home} />
//           <Tab.Screen name="Timetables" component={TimelineComponent} />
//         </Tab.Navigator>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5", // Replace with your desired background color
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   profileHeader: {
//     width: "100%",
//     height: 200,
//     justifyContent: "center",
//     alignItems: "center",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#ccc",
//     marginTop: 12,
//     paddingBottom: 16,
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginTop: 8,
//   },
// });

// export default ProfileComponent;
