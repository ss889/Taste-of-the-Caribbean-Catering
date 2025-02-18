import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';


const success = () => {
  const router = useRouter();
  const navigateToHome = () => {
    router.replace('../home');
  }

  return (
    <SafeAreaView>
        <View className='ml-30 mt-[252px] justify-center items-center'>
            <AntDesign name="checkcircle" size={80} color="#32B768" />
            <Text className="text-[#374151] text-3xl font-bold mt-4">Success</Text>
            <Text className="text-[#828282] mt-2">Your account has been created!</Text>
            <CustomButton
                title={"Continue"}
                handlePress={navigateToHome}
                containerStyles={"mt-24 w-[256px] h-[49px]"}
                textStyles={"text-white text-lg"}
                isLoading={false}
            />  
        </View>
    </SafeAreaView>
  )
}

export default success