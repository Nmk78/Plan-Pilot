
import { useEffect, useState } from "react";

import { auth, db, storage } from "../../firebaseconfig"; // Ensure you have firebaseConfig.ts where you initialize Firebase
import ProfileHeader from "@/components/profileHeader";
import profileAction from "@/components/profileAction";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import ProfileActions from "@/components/profileAction";
import AuthScreen from "@/components/authScreen";
import * as ImagePicker from "expo-image-picker";

const ProfileComponent: React.FC = () => {
  let user;
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setUserame] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null | undefined>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        setUserInfo(userDoc.data());
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);
  

  const handleAuthentication = async () => {
    setLoading(true);
    console.log("user information:", email, password);
    try {
      let user;
      if (isLogin) {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log("🚀 ~ handleAuthentication ~ response:", response);
        user = response.user;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("🚀 ~ handleAuthentication ~ userCredential:", userCredential);
        user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          username: name,
          email: user.email,
          photo: "",
        });
        await updateProfile(user, { displayName: name });
      }
  
      // Fetch and set user info
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        setUserInfo(userDoc.data());
      }
    } catch (error) {
            // @ts-ignore
      console.log("🚀 ~ handleAuthentication ~ error:", error.message);
      // @ts-ignore
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setErr("Sign-out failed. Please try again.");
    }
  };

  const handleImageUpload = async () => {
    try {
      // Pick an image from the device
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.4,
      });
  
      if (!result.canceled) {
        const { uri, fileName } = result.assets[0];
        
        if (uri && fileName) {
          console.log("Image picked:", fileName);
          
          // Convert the image URI to a Blob
          const response = await fetch(uri);
          const blob = await response.blob();
          console.log("🚀 ~ Blob:", blob);
  
          // Upload the image to Firebase Storage
          const storage = getStorage();
          const auth = getAuth();
          const user = auth.currentUser;
  
          if (!user) {
            throw new Error("User is not logged in");
          }
  
          const photoRef = ref(storage, `user_photos/${user.uid}/${userInfo.username}`);
          const uploadTask = uploadBytesResumable(photoRef, blob);
  
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Upload error:", error);
            },
            async () => {
              try {
                // Get the download URL of the uploaded image
                const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("Photo URL:", photoURL);
  
                // Update the user's profile with the new photo URL
                await updateProfile(user, { photoURL: photoURL });
  
                  console.log("🚀 ~ downloadURL:", photoURL)
                  setImageUri(photoURL);
        
                  if (user && user.uid) {
                    const userRef = doc(db, "users", user.uid);
                    await setDoc(userRef, { photo: photoURL }, { merge: true });
                  }        
                const updatedUser = auth.currentUser;
                if (updatedUser) {
                  // You may need to fetch the user profile data again here
                  const userRef = doc(db, "users", user.uid);
                  const userDoc = await getDoc(userRef);
                  setUserInfo(userDoc.data());
  
                  // For demonstration, we'll log the updated profile
                  console.log("Updated user profile:", updatedUser);
                  // setUserProfile({ ...updatedUser, photoURL: photoURL });
                }

                // console.log("🚀 ~ userInfo:", userInfo)

                console.log("Profile updated with new photo URL!");
              } catch (error) {
                console.error("Error updating profile:", error);
              }
            }
          );
        }
      }
    } catch (error) {
      console.error("Error handling image upload:", error);
    }
  };

  const toggleProfileActions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SafeAreaView className="bg-background flex flex-1">
      {userInfo ? (
        <>
          <ProfileHeader
            userInfo={userInfo}
            imageUri={imageUri}
            pickImage={handleImageUpload}
          />
          <ProfileActions
            isOpen={isOpen}
            onToggle={toggleProfileActions}
            handleAuthentication={handleSignOut}
            pickImage={handleImageUpload}
          />
        </>
      ) : (
        <AuthScreen
          name={name}
          setUserame={setUserame}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
          err={err}
          loading={loading}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileComponent;
