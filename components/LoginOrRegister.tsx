// // import React, { useEffect } from 'react';
// // import { View, Button, Text } from 'react-native';
// // import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

// // const LoginOrRegister = () => {
// //   useEffect(() => {
// //     GoogleSignin.configure({
// //       webClientId: "347672292527-2nko7a9f75i8k7sortfbisdeha9gq3gl.apps.googleusercontent.com", //TODO This has to be change : Hard Coded Web-Client-ID // From Firebase Console
// //       offlineAccess: true,
// //     });
// //   }, []);

// //   const signIn = async () => {
// //     try {
// //       await GoogleSignin.hasPlayServices();
// //       const userInfo = await GoogleSignin.signIn();
// //       console.log("🚀 ~ signIn ~ userInfo:", userInfo)
// //     } catch (error:any) {
// //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
// //         // user cancelled the login flow
// //       } else if (error.code === statusCodes.IN_PROGRESS) {
// //         // operation (e.g. sign in) is in progress already
// //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
// //         // play services not available or outdated
// //       } else {
// //         // some other error happened
// //       }
// //     }
// //   };

// //   const signOut = async () => {
// //     try {
// //       await GoogleSignin.revokeAccess();
// //       await GoogleSignin.signOut();
// //       console.log('User signed out');
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <View>
// //       <GoogleSigninButton
// //         onPress={signIn}
// //         size={GoogleSigninButton.Size.Wide}
// //         color={GoogleSigninButton.Color.Dark}
// //       />
// //       <Button title="Sign Out" onPress={signOut} />
// //     </View>
// //   );
// // };

// // export default LoginOrRegister;


// // // import React from 'react';
// // // import { Text, View, Button, Alert } from 'react-native';
// // // import Constants from 'expo-constants';
// // // import * as AuthSession from 'expo-auth-session';
// // // import * as AppAuth from 'expo-app-auth';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // const LoginOrRegister = () => {
// // //   const handleGoogleSignIn = async () => {
// // //     try {
// // //       // Check if Constants.manifest exists before accessing its properties
// // //       if (!Constants.manifest) {
// // //         throw new Error('Constants.manifest is undefined or null');
// // //       }

// // //       const { clientId } = Constants.manifest.extra;
// // //       const redirectUrl = AuthSession.getRedirectUrl();
// // //       const result = await AppAuth.authAsync({
// // //         issuer: 'https://accounts.google.com',
// // //         scopes: ['openid', 'profile', 'email'],
// // //         clientId,
// // //         redirectUrl,
// // //       });

// // //       //@ts-ignore
// // //       if (result.type === 'success') {
// // //         //@ts-ignore
// // //         await AsyncStorage.setItem('user', JSON.stringify(result.user));
// // //         Alert.alert('Success', 'Signed in successfully!');
// // //       } else {
// // //         Alert.alert('Failed', 'Sign in failed or cancelled!');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error signing in:', error);
// // //       Alert.alert('Error', 'Failed to sign in!');
// // //     }
// // //   };

// // //   return (
// // //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // //       <Text>Google Sign-In Example</Text>
// // //       <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
// // //     </View>
// // //   );
// // // };

// // // export default LoginOrRegister;

//TODO This may need to Delete

// import React from 'react';
// import { View, Button } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';

// let id = "347672292527-2nko7a9f75i8k7sortfbisdeha9gq3gl.apps.googleusercontent.com"

// export default function App() {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: id,
//   });

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       // Handle successful authentication, e.g., send id_token to your backend
//     }
//   }, [response]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button
//         title="Sign in with Google"
//         onPress={() => {
//           promptAsync();
//         }}
//       />
//     </View>
//   );
// }

