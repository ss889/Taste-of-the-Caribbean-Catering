import React, { useState } from 'react';
import { SafeAreaView, Image, Text, View, StatusBar } from "react-native";
import { router } from 'expo-router';
import AuthModal from '../app/(auth)/AuthModal'; 
import CustomButton from "@/components/CustomButton";
import { icons } from "../constants";
import AppleSignIn from './AppleSignIn';
import GoogleSignIn from './GoogleSignIn';

const AuthComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <SafeAreaView>
        <View className="w-full justify-center items-center px-10">
          <Image className="mt-10 w-80 h-80" source={icons.welcome} resizeMode="contain" />
  
          <Text className="text-3xl font-bold mb-5 mt-3">Welcome</Text>
  
          <Text className="text-sm text-gray-500 text-center mb-6">
            Before enjoying Taste of the Caribbean services, you need to register first.
          </Text>
  
          <CustomButton
            title={"Create Account"}
            handlePress={() => setModalVisible(true)}
            containerStyles={"w-[256px] h-[49px] mt-7"}
            textStyles={"text-[#FFFFFF] font-bold"}
            isLoading={false}
          />
  
          <CustomButton
            title={"Login"}
            handlePress={() => setModalVisible(true)}
            containerStyles={"w-[256px] h-[49px] mt-7 bg-[#D1FAE5] mb-8"}
            textStyles={"text-[#10B981] font-bold"}
            isLoading={false}
          />

          <AppleSignIn/>
          <Text className='mb-2'></Text>
          <GoogleSignIn/>

        </View>
  
        <AuthModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
  
        <StatusBar barStyle={"dark-content"} />
      </SafeAreaView>
    );
}

export default AuthComponent




