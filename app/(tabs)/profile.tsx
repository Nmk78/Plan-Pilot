import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
} from "react-native";
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
// import LoginOrRegister from "@/components/LoginOrRegister";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";

import { initializeApp } from "firebase/app";
import { NativeWindStyleSheet } from "nativewind";
const Tab = createMaterialTopTabNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export const firebaseConfig = {
  apiKey: "AIzaSyBKyBNU6fFRTi-kK0cSHuQ6hOKRLEMhf1Q",
  authDomain: "plan-pilot-d86f1.firebaseapp.com",
  projectId: "plan-pilot-d86f1",
  storageBucket: "plan-pilot-d86f1.appspot.com",
  messagingSenderId: "167164672245",
  appId: "1:167164672245:web:fd5763c5a5e1539b71edbc",
  measurementId: "G-58NCD8QZ10",
};

export const app = initializeApp(firebaseConfig);

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
  err,
}: any) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>
      <TextInput
        className="  bg-slate-200"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        className="  bg-slate-200"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {err ? <Text style={styles.errorText}>{err}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button
          title={isLogin ? "Sign In" : "Sign Up"}
          onPress={handleAuthentication}
          color="#3498db"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
  );
};

const AuthenticatedScreen = ({ user, handleAuthentication }: any) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

const ProfileComponent = () => {
  const { isOpen, onToggle } = useDisclose();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<String | undefined>("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //@ts-ignore
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      setErr(undefined);
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("User created successfully!");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setErr(error.message);
    }
  };

  return (
    <>
      {user ? (
        // Show user's email if user is authenticated
        <SafeAreaView className="bg-background flex flex-1">
          <View className="w-full h-60 justify-center items-center mt-12 pb-3 border-b-[0.5px] border-text">
            <Image
              source={require("../../assets/images/myat.jpg")}
              className="w-40 h-40 rounded-full object-cover"
              style={{ objectFit: "cover" }}
            />
            <Text className="text-text text-3xl font-semibold mt-3">
              Nay Myo Khant
            </Text>
          </View>
          {/* <LoginOrRegister/> */}
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

          <Center position="absolute" bottom={10} right={5}>
            <Box alignItems="end" minH="220">
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
                      onPress={handleAuthentication}
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
      ) : (
        <SafeAreaView className="bg-background flex justify-center items-center flex-1">
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
            err={err}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default ProfileComponent;

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
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#031430",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#fafafa",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 10,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
