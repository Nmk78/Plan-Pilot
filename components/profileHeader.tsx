import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import * as ImagePicker from "expo-image-picker";
interface ProfileHeaderProps {
  userInfo: any;
  imageUri: string | null | undefined;
  pickImage: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userInfo,
  imageUri,
  pickImage,
}) => {
  console.log("🚀 ~ userInfo:", userInfo);
  console.log("🚀 ~ imageUri:", imageUri);

  const defaultImage = require("../assets/icons/avatar.png"); // Correct path to your local image

  return (
    <View style={styles.headerContainer}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.profileImage}
          onError={(error) => console.log('Image failed to load', error)}
        />
      ) : userInfo.photo ? (
        <Image
          source={{ uri: userInfo.photo }}
          style={styles.profileImage}
          onError={(error) => console.log('Image failed to load', error)}
        />
      ) : (
        <View style={styles.profilePlaceholder}>
          <Image source={defaultImage} style={styles.profileImage} />
          <Text className="text-gray-200 text-xl font-thin">Select an image</Text>
        </View>
      )}
      <Text style={styles.username} className="text-white text-3xl font-bold">
        {userInfo?.username}
      </Text>
      <Text style={styles.email} className="text-gray-200 text-xl font-thin">
        {userInfo?.email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    lineHeight: 100,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});

export default ProfileHeader;
