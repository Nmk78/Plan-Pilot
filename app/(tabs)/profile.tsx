import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import Home from "."; // Adjust the path as needed
import { TimelineComponent } from "@/components/Timeline"; // Adjust the path as needed
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Stagger,
  useDisclose,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TimeTables from "@/components/TimeTables";
import Subjects from "@/components/Subjects";

const Tab = createMaterialTopTabNavigator();

const ProfileComponent = () => {
  const { isOpen, onToggle } = useDisclose();

  return (
    <>
      <SafeAreaView className="bg-background flex flex-1">
        <View className="w-full h-60 justify-center items-center mt-12 pb-3 border-b-[0.5px] border-text">
          <Image
            source={require("../../assets/images/myat.jpg")}
            className="w-40 h-40 rounded-full object-cover"
            style={{objectFit:"cover"}}
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
          <Tab.Screen name="Subjects" component={Subjects} />
          <Tab.Screen name="Timetables" component={TimeTables} />
        </Tab.Navigator>

        <Center  position="absolute" bottom={10} right={5}>
          <Box alignItems="end"  minH="220">
            <Stagger
              visible={isOpen}
              initial={{
                opacity: 0,
                scale: 0,
                translateY: 34,
              }}
              animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  mass: 0.8,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                  duration: 300,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
            >
              <IconButton
                mb="4"
                variant="solid"
                bg="blue.100"
                colorScheme="indigo"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialIcons}
                    size="6"
                    name="location-pin"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="yellow.400"
                colorScheme="yellow"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="6"
                    name="microphone"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="teal.400"
                colorScheme="teal"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="6"
                    name="video"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="red.500"
                colorScheme="red"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialIcons}
                    size="6"
                    name="photo-library"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
            </Stagger>
          </Box>
          <HStack alignItems="center">
            <IconButton
              variant="solid"
              borderRadius="full"
              size="lg"
              onPress={onToggle}
              bg="cyan.400"
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  size="6"
                  name="dots-horizontal"
                  color="warmGray.50"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
            />
          </HStack>
        </Center>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    backgroundColor: "#031430",
    display: "flex",    
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
