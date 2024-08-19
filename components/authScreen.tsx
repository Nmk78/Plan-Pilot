import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface AuthScreenProps {
  name: string;
  setUserame: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  handleAuthentication: () => void;
  err: string | undefined;
  loading: boolean;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
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
}) => {
  return (
    <View className="text-white flex-1 w-4/5 h-screen flex justify-center mx-auto">
      <Text className="text-2xl text-center text-gray-100 font-bold">
        {isLogin ? "Sign In" : "Sign Up"}
      </Text>
      {!isLogin && (
        <TextInput
          className="text-gray-200 border-b h-10 mb-4 px-2 border-gray-100"
          value={name}
          onChangeText={setUserame}
          placeholder="Name"
          placeholderTextColor="#e0e0e0"
          autoCapitalize="none"
        />
      )}
      <TextInput
          className="text-gray-200 border-b h-10 mb-4 px-2 border-gray-100"
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#e0e0e0"
        autoCapitalize="none"
      />
      <TextInput
          className="text-gray-200 border-b h-10 mb-4 px-2 border-gray-100"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#e0e0e0"
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
        <Text className="text-white" onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0066ff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonLoading: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "blue",
  },
});

export default AuthScreen;
