import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import CustomButton from "@/components/CustomButton"; 
import LoadingIndicator from '@/components/LoadingComponent';

interface SignInProps {
  onClose: () => void;
  toggleMode: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose, toggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Login Successful', 'You have successfully logged in.');
      onClose(); 
    } catch (error) {
      //Alert.alert('Error', error.message);
    }
  };

  return (
    <View >
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
        title="Login"
        handlePress={handleLogin}
        containerStyles="mt-5 h-[49px]"
        textStyles="text-xl font-bold"
      />
      <Text className="text-center mt-4">
        Don't have an account?{' '}
        <Text onPress={toggleMode} className="text-blue-500">Sign Up</Text>
      </Text>

      <LoadingIndicator visible={loading} />

    </View>
  );
};

export default SignIn;
