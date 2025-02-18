import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import SignIn from './sign-in';
import SignUp from './sign-up';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true); 

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-3xl h-3/4 p-5 shadow-lg">
          <View className="flex-row justify-around items-center mt-8 mb-12">
            <TouchableOpacity
              onPress={() => toggleMode()}
              className={`flex-1 items-center pb-1 ${isSignUp ? 'border-b-4 border-green-500' : ''}`}
            >
              <Text className="text-xl font-bold text-gray-900">Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleMode()}
              className={`flex-1 items-center pb-1 ${!isSignUp ? 'border-b-4 border-green-500' : ''}`}
            >
              <Text className="text-xl font-bold text-gray-900">Login</Text>
            </TouchableOpacity>
          </View>

          {isSignUp ? (
            <SignUp onClose={onClose} toggleMode={toggleMode} />
          ) : (
            <SignIn onClose={onClose} toggleMode={toggleMode}/>
          )}

          <TouchableOpacity
            onPress={onClose}
            className="mt-4"
          >
            <Text className="text-center text-red-500">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;
