import React, {useEffect} from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from 'expo-auth-session';
import auth from "./firebaseConfig"
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Facebook from 'expo-facebook';
import { FacebookAuthProvider } from 'firebase/auth';

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '1058654249816-kfu4pjujlkq6bkq1l8b9gh8qq7teais2.apps.googleusercontent',
  });

useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log('Google Login Success:', userCredential.user);
        })
        .catch((error) => {
          console.error('Google Login Error:', error);
        });
    }
  }, [response]);

  async function loginWithFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: '570007695822941',
      });
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (result.type === 'success') {
        const credential = FacebookAuthProvider.credential(result.token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log('Facebook Login Success:', userCredential.user);
          })
          .catch((error) => {
            console.error('Facebook Login Error:', error);
          });
      } else {
        console.log('Facebook login cancelled');
      }
    } catch (error) {
      console.error('Facebook Login Error:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title="Login with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
        <Button title="Login with Facebook" onPress={loginWithFacebook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
