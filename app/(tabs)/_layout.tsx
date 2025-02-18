import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/Contexts/AuthContext'; // Import the useAuth hook

const TabsLayout = () => {
  const { isAdmin } = useAuth(); // Access isAdmin from AuthContext
  console.log(isAdmin)

  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#00CC99",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="home" color={color} size={30} />
                    )
                }}
            />

            <Tabs.Screen
                name="menu"
                options={{
                    title: 'Menu',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="menu-book" color={color} size={30} />
                    )
                }}
            />

           

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account" color={color} size={30} />
                    )
                }}
            />

            <Tabs.Screen
                name="admin"
                redirect={!isAdmin}
                options={{
                    title: 'Admin',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="admin-panel-settings" color={color} size={30} />
                    )
                }}
            />
        </Tabs>
    </>
  );
};

export default TabsLayout;
