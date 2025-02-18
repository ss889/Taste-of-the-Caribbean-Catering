import { StyleSheet, Text, View } from 'react-native'
import { Slot, SplashScreen, Stack, useSegments, useRouter } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { AuthContextProvider, useAuth } from '@/Contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '@/Contexts/CartContext';
import { StripeProvider } from '@stripe/stripe-react-native';

SplashScreen.preventAutoHideAsync();

const MainLayout = () =>{
  const { isAuthenticated, checkEmailVerification } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  

  useEffect(()=>{
    const handleAuthState = async () =>{
      //if(typeof isAuthenticated=='undefined') return;
      const inApp = segments[0] == '(tabs)';
      const emailVerified = await checkEmailVerification();
      router.replace('../home');
      // if(!emailVerified && isAuthenticated){
      //   router.replace('../verify-email');
      //   return;
      // }
      // if(isAuthenticated && !inApp){
      //   router.replace('../home');
      // }else{
      //   router.replace('/');
      // }
    };

    handleAuthState();
    SplashScreen.hideAsync();

  }, [isAuthenticated])

  return <Slot />
}


export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StripeProvider 
        publishableKey="pk_test_51QNyXrEf2F8pApztqVGwicHHBrT3YIfMYsKtGyrmXEnHEXn0MdFXkCfp2tO9OsHT0Uwl9Tluc5WuJYjTDfbi7IKG00mzl23Wkf"
        merchantIdentifier="merchant.com.tasteofthecaribbeanfoodmarket"
      >
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </StripeProvider>
    </AuthContextProvider>


    // <Stack>
    //   <Stack.Screen name="index" options={{ headerShown:
    //     false }}/>
    //   <Stack.Screen name="(tabs)" options={{ headerShown:
    //     false }}/>

    // </Stack>
  )
}

