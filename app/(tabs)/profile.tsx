import React, { useEffect, useRef, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
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
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  updateProfile,
} from "firebase/auth";
import { NativeWindStyleSheet } from "nativewind";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { app, auth, db, storage } from "../../firebaseconfig"; // Import from your initialization file
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  listAll,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
const Tab = createMaterialTopTabNavigator();

NativeWindStyleSheet.setOutput({
  default: "native",
});

NativeWindStyleSheet.setOutput({
  default: "native",
});

const AuthScreen = ({
  name,
  setUserame,
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
  err,
  loading,
}: any) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>

      {isLogin == false && (
        <TextInput
          className="  bg-slate-200"
          style={styles.input}
          value={name}
          onChangeText={setUserame}
          placeholder="Name"
          autoCapitalize="none"
        />
      )}
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
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonLoading]}
          onPress={handleAuthentication}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? "Sign In" : "Sign Up"}
            </Text>
          )}
        </TouchableOpacity>
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

const ProfileComponent = () => {
  const { isOpen, onToggle } = useDisclose();
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<String | undefined>("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUri, setImageUri] = useState<string | null | undefined>(null);
  const [imageName, setImageName] = useState<string | null | undefined>(null);

  const pickImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.4,
    });

    if (!result.cancelled) {
      console.log("Image picked:", result.assets[0].fileName);
      setImageUri(result.assets[0].uri);
      setImageName(result.assets[0].fileName);

      handleUpload(imageUri, imageName);
    }
  };

  const handleUpload = async (imageUri: any, imageName: any) => {
    if (imageUri && imageName) {
      console.log("🚩Uploading image");
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        console.log("🚀 ~ handleUpload ~ blob:", blob);
        await uploadPhoto(blob, imageName);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  const uploadPhoto = async (blob: Blob, imageName: string) => {
    try {
      const storage = getStorage();
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User is not logged in");
      }

      const photoRef = ref(storage, `user_photos/${user.uid}/${imageName}`);
      const uploadTask = uploadBytesResumable(photoRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Photo URL:", photoURL);

          // Update the user's profile with the new photo URL
          await updateProfile(user, { photoURL: photoURL });
          console.log("Profile updated with new photo URL!");
        }
      );
    } catch (error) {
      console.error("Error in uploadPhoto:", error);
    }
  };

  const handleAuthentication = async () => {
    try {
      setLoading(true);
      setErr(undefined);
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User signed in successfully!");
          const userDoc = await getDoc(
            doc(db, "users", userCredential.user.uid)
          );
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
            console.log("🚀 ~ handleAuthentication ~ u:", userInfo);
          } else {
            console.log("No such document!");
          }
        } else {
          // Sign up
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          console.log("User created successfully!");

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Store user details in Firestore
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username: username,
            photoURL: user.photoURL,
            createdAt: new Date(),
          });

          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            console.log("🚀 ~ handleAuthentication ~ u:", userDoc.data());
            setUserInfo(userDoc.data());
          } else {
            console.log("No such document!");
          }
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setErr(error.message);
    } finally {
      setLoading(false); // Set loading to false when authentication is complete
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      if (user) { // Check if user is not null
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      } else {
        console.log("No user is logged in.");
        setLoading(false); // Make sure to stop loading if there's no user
      }
    };
  
    fetchData();
  }, [user]);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      {user ? (
        <SafeAreaView className="bg-background flex flex-1">
          <View className="w-full h-60 justify-center items-center mt-12 pb-3 border-b-[0.5px] border-text">
            {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 150, height: 150, borderRadius: 80 }}
              />
            ) : userInfo?.photo ? (
              <Image
                source={{ uri: userInfo.photo }}
                style={{ width: 150, height: 150, borderRadius: 80 }}
              />
            ) : (
              <Text className="text-white">Select an image</Text>
            )}
            <Text className="text-text text-3xl font-semibold mt-3">
              {userInfo?.username}
            </Text>
            <Text className="text-text text-xl font-light my-2">
              {userInfo?.email}
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
                  translateY: 40,
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
                  translateY: 0,
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
                  bg="blue.500"
                  colorScheme="indigo"
                  borderRadius="full"
                  icon={
                    <Icon
                      onPress={handleAuthentication}
                      as={MaterialIcons}
                      size="6"
                      name="logout"
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
            usrername={username}
            setUserame={setUserame}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
            err={err}
            loading={loading} // Pass loading state to AuthScreen
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonLoading: {
    backgroundColor: "#2980b9",
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
