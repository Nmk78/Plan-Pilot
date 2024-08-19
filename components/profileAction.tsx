import React from "react";
import { Box, Center, HStack, Icon, IconButton, Stagger } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Subjects from "./Subjects";
import TimeTables from "./TimeTables";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { subjects } from "@/constants/Constants";

interface ProfileActionsProps {
  isOpen: boolean;
  onToggle: () => void;
  handleAuthentication: () => void;
  pickImage: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isOpen,
  onToggle,
  handleAuthentication,
  pickImage,
}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIndicatorStyle: styles.tabBarIndicator,
        }}
      >
        <Tab.Screen
          name="Subjects"
          component={() => <Subjects mode="subject" />}
        />
        <Tab.Screen name="Timetables" component={TimeTables} />
      </Tab.Navigator>
      <Center position="absolute" bottom={10} right={5}>
        <Box alignItems="end" minH="220">
          <Stagger
            visible={isOpen}
            initial={{ opacity: 0, scale: 0, translateY: 34 }}
            animate={{
              translateY: 40,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: { offset: 30, reverse: true },
              },
            }}
            exit={{
              translateY: 0,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 300,
                stagger: { offset: 30, reverse: true },
              },
            }}
          >
            <IconButton
              mb="4"
              variant="solid"
              bg="blue.500"
              colorScheme="indigo"
              borderRadius="full"
              icon={
                <Icon
                  as={MaterialIcons}
                  size="6"
                  name="logout"
                  color="warmGray.50"
                />
              }
              onPress={handleAuthentication}
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
                  size="6"
                  name="plus"
                  color="warmGray.50"
                />
              }
            />
            <IconButton
              mb="4"
              onPress={pickImage}
              variant="solid"
              bg="red.500"
              colorScheme="red"
              borderRadius="full"
              icon={
                <Icon
                  as={MaterialIcons}
                  size="6"
                  name="photo-library"
                  color="warmGray.50"
                />
              }
            />
          </Stagger>
        </Box>
        <HStack alignItems="center" justifyContent="center" mt={4}>
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
              />
            }
          />
        </HStack>
      </Center>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default ProfileActions;
