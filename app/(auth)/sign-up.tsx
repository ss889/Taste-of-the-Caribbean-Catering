import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import CustomButton from "@/components/CustomButton"; 
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import LoadingIndicator from '@/components/LoadingComponent';

interface SignUpProps {
  onClose: () => void;
  toggleMode: () => void; 
}

const SignUp: React.FC<SignUpProps> = ({ onClose, toggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid; 

        await setDoc(doc(db, 'users', uid), {
            name,
            email,
        });
        setLoading(false);
        router.replace('/success');  
      onClose(); 
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View>
      <Text className="font-bold text-lg">Full Name</Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-xl p-2 mb-4"
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text className="font-bold text-lg">Email Address</Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-xl p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text className="font-bold text-lg">Password</Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-xl p-2 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <CustomButton
        title="Sign Up"
        handlePress={handleSignup}
        containerStyles="mt-5 h-[49px]"
        textStyles="text-xl font-bold"
        isLoading={false}
      />
      <Text className="text-center mt-4">
        Already have an account?{' '}
        <Text onPress={toggleMode} className="text-blue-500">Login</Text>
      </Text>

      <LoadingIndicator visible={loading} />
    </View>
  );
};

export default SignUp;
