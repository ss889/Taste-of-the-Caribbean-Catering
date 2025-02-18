import { View, Text, Button } from 'react-native'
import React from 'react'
import { auth } from '../../firebase';
import { sendEmailVerification } from 'firebase/auth';

const VerifyEmail = () => {
    const handleResendVerification = async () => {
        if (auth.currentUser){
            await sendEmailVerification(auth.currentUser);
            alert('Verification email sent!')
        }
    }

  return (
    <View>
      <Text>Please verify your email address before continuing.</Text>
      <Button title="Resend Verification Email" onPress={handleResendVerification} />
    </View>
  )
}

export default VerifyEmail;