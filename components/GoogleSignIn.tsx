import React, { useEffect } from 'react';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase'; 
import { SocialIcon } from 'react-native-elements';

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "927448312925-g0b81ip6j52phoqanrn9ffk7c6deklla.apps.googleusercontent.com",

        redirectUri: "https://toc-app-d8842.firebaseapp.com/__/auth/handler",
      });
    
      useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
    
          const credential = GoogleAuthProvider.credential(id_token);
    
          signInWithCredential(auth, credential)
            .then((userCredential) => {
              console.log('User signed in:', userCredential.user);
            })
            .catch((error) => {
              console.error('Error signing in:', error);
            });
        }
      }, [response]);
    
      return (
        <Button
          disabled={!request}
          title="Sign in with Google"
          onPress={() => promptAsync()}
        />
      );
    };

export default GoogleSignIn