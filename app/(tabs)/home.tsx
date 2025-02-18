// Home.tsx
import { Image, View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../firebase'; 
import { collection, getDoc, doc} from 'firebase/firestore';
import useFirestore from '../../hooks/useFirestore'; 
import { icons } from '@/constants';
import { useAuth } from '../../Contexts/AuthContext'
import EmailVerification from '@/components/EmailVerification';
import { images } from '@/constants'

const Home = () => {
    const deals = [
        { id: 1, title: 'Ice Cream', imageUri: images.ice_cream },
        { id: 2, title: 'Pudding', imageUri: images.pudding },
        { id: 3, title: 'Mac N Cheese', imageUri: images.mac }
    ];

    // Hardcoded New Arrivals
    const arrivals = [
        { id: 1, title: "Empanadas", imageUri: images.empanadas },
        { id: 2, title: "Codfish Fritters", imageUri: images.codfish },
        { id: 3, title: "Wild Caught Shrimp", imageUri: images.shrimp }
    ];
    const [ userName, setUserName ] = useState('');
    const { user, isAuthenticated } = useAuth();
    useEffect(() => {
        //console.log(user)
        console.log('User state changed:', user);
        const fetchUserName = async () => {
            if (auth.currentUser) {
                // First, check in the 'admin' collection
                const adminDocRef = doc(db, 'admin', auth.currentUser.uid);
                const adminDocSnap = await getDoc(adminDocRef);
    
                // If the user is an admin, set their username from the 'admin' collection
                if (adminDocSnap.exists()) {
                    setUserName(adminDocSnap.data().name); // Assuming the admin collection has a 'name' field
                    console.log("User is an admin, name:", adminDocSnap.data().name);
                } else {
                    // If not an admin, check in the 'users' collection
                    const userDocRef = doc(db, 'users', auth.currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    
                    if (userDocSnap.exists()) {
                        setUserName(userDocSnap.data().name);
                        console.log("User is a regular user, name:", userDocSnap.data().name);
                    } else {
                        setUserName(""); // If no name found in both collections
                    }
                }
            } else {
                setUserName(""); // If there's no current user logged in
            }
        };
    
        fetchUserName();
    }, [user]); // Dependency on 'user' state, ensuring the fetch happens whenever 'user' changes.
    

    if (!deals || !arrivals) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex-row justify-between items-center px-5 mt-5'>
                    <View>
                        {isAuthenticated ? <Text className='text-3xl font-bold text-gray-800'>Welcome Back,</Text> : <Text className='text-3xl font-bold text-gray-800'>Hello There</Text>}
                        <Text className='text-2xl text-gray-600 mt-1'>{userName || ''}</Text>
                    </View>
                    <Image className='w-24 h-24'
                        source={icons.logo}
                        resizeMode='contain'
                    />
                </View>

                <View className="flex-row justify-center items-center mt-10">
                    <Image className="w-5 h-5"
                        source={icons.pin}
                        resizeMode='contain'
                    />
                    <Text className="text-lg text-center ml-2 underline">17 Linden St, Newark, NJ 07102</Text>
                </View>
                
                
              {/* Current Deals Section */}
              <View className="mt-4">
                    <Text className="text-2xl font-bold text-gray-800 mb-3 ml-5">Current Deals</Text>
                    <ScrollView className='px-5' horizontal={true} showsHorizontalScrollIndicator={false}>
                        {deals.map(deal => (
                            <TouchableOpacity 
                                key={deal.id} 
                                className="w-[230px] h-[230px] bg-white rounded-3xl mr-4 shadow-xl transform transition-all hover:scale-105 justify-center items-center relative"
                                activeOpacity={0.8}
                            >
                                {/* Image */}
                                <Image 
                                    className="w-full h-full object-cover rounded-3xl" 
                                    source={deal.imageUri} 
                                    resizeMode="cover" 
                                />
                                {/* Blurred background with rounded bottom corners */}
                                <View className="absolute inset-0 bg-black opacity-40 rounded-3xl" style={{ top: 'auto', bottom: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
                                {/* Text with a blurred background at the bottom */}
                                <Text className="absolute text-white text-lg font-bold z-10 px-6 py-3 bottom-0 left-0 right-0 text-center">
                                    {deal.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* New Arrivals Section */}
                <View className="mt-10">
                    <Text className="text-2xl font-bold text-gray-800 mb-3 ml-5">New Arrivals</Text>
                    <ScrollView className='px-5' horizontal={true} showsHorizontalScrollIndicator={false}>
                        {arrivals.map(arrival => (
                            <TouchableOpacity 
                                key={arrival.id} 
                                className="w-[160px] h-[160px] bg-white rounded-3xl mr-4 shadow-xl transform transition-all hover:scale-105 justify-center items-center relative"
                                activeOpacity={0.8}
                            >
                                {/* Image */}
                                <Image 
                                    className="w-full h-full object-cover rounded-3xl" 
                                    source={arrival.imageUri} 
                                    resizeMode="cover" 
                                />
                                {/* Blurred background with rounded bottom corners */}
                                <View className="absolute inset-0 bg-black opacity-40 rounded-3xl" style={{ top: 'auto', bottom: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
                                {/* Text with a blurred background at the bottom */}
                                <Text className="absolute text-white text-lg font-bold z-10 px-6 py-3 bottom-0 left-0 right-0 text-center">
                                    {arrival.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <EmailVerification/>
        </SafeAreaView>
    );
};

export default Home;
