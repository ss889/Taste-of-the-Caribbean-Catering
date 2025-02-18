import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@/Contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const EmailVerification = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { checkEmailVerification, isAuthenticated } = useAuth();

    const handleResendVerification = async () => {
        if (auth.currentUser){
            await sendEmailVerification(auth.currentUser);
            alert('Verification email sent!')
        }   
    }

  useEffect(()=>{
    const handleVerifyState = async () =>{
      const emailVerified = await checkEmailVerification();
      console.log(emailVerified)
      if(emailVerified) { setIsEmailVerified(true); }
    };
    //console.log(isEmailVerified)

    handleVerifyState();

  }, [])

  if(!isAuthenticated || isEmailVerified) return null;

  return (
    !isEmailVerified && isAuthenticated && (
      <View style={styles.container}>
        <Text style={styles.message}>Please verify your email to continue.</Text>
        <TouchableOpacity onPress={handleResendVerification} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Resend Email</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  message: {
    color: '#fff',
    fontSize: 14,
  },
  closeButton: {
    marginLeft: 15,
  },
  closeButtonText: {
    color: '#ff6347', 
    fontWeight: 'bold',
  },
});

export default EmailVerification;
