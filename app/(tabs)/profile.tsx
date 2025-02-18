import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useAuth } from "../../Contexts/AuthContext"
import CustomButton from "@/components/CustomButton";
import { useRouter } from 'expo-router';
import AuthComponent from '@/components/AuthComponent';
import AppleSignIn from '@/components/AppleSignIn';

const profile = () => {
    const { login, logout, isAuthenticated } = useAuth();
    const router = useRouter();

  return (
    <SafeAreaView>
        { isAuthenticated ? 
        
        <CustomButton
             title={"Log off"}
             handlePress={() => logout()}
             containerStyles={"w-[256px] h-[49px] justify-center mt-[250px] ml-[100px]"}
             textStyles={"text-[#FFFFFF] font-bold"}
        />
        : 
        
        <AuthComponent/>
        
        }
        
    </SafeAreaView>
  )
}

export default profile;