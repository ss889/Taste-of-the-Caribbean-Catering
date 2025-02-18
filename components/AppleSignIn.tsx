import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';
import { getAuth, OAuthProvider, signInWithCredential } from "firebase/auth";
import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const auth = getAuth();

const AppleSignIn = () => {
  return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={10}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });

            const { identityToken, fullName } = credential;
            const firstName = fullName?.givenName || "";
            const middleName = fullName?.middleName || "";
            const lastName = fullName?.familyName || "";

            const fullUserName = `${firstName} ${middleName ? middleName + " " : ""}${lastName}`.trim();
  


            if (identityToken) {
              // Create Firebase credential using OAuthProvider for Apple
              const fbCredentials = new OAuthProvider('apple.com').credential({
                idToken: identityToken,
              });
  
              // Sign in with Firebase using the Apple credential
              const result = await signInWithCredential(auth, fbCredentials);
              const uid = result.user.uid;
              const email = result.user.email;
              await setDoc(doc(db, 'users', uid), {
                fullUserName,
                email
              });
              console.log(result.user)
              console.log('User signed in with Apple:', result.user);
            } else {
              console.log('Apple authentication failed: No identity token received.');
            }
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              
            } else {
              console.error('Error signing in with Apple:', e);
            }
          }
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 250,
    height: 44,
  },
});

export default AppleSignIn
