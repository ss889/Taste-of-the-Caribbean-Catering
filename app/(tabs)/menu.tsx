import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native-elements'
import MenuCategories from '@/components/MenuCategories'
import { icons } from '@/constants'
import CartButton from '@/components/CartButton'
import { useCart } from '@/Contexts/CartContext'
import { useState } from 'react'
import CartModal from '@/components/CartModal'
import ItemModal from '@/components/ItemModal'
const Menu = () => {
  const { cart } = useCart(); // Access cart from context
  const [isCartVisible, setCartVisible] = useState<boolean>(false); // State for modal visibility
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name: '',
    price: 0,
    imageUri: '',
    description: '',
  });

  const handleCartButtonPress = () => {
    setCartVisible(true); // Open the cart modal when pressed
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-start pt-10 space-y-8">
        <Image 
          source={icons.logo} 
          className="w-96 h-24" 
        />
        <Text className="text-2xl text-gray-800">Menu</Text>
        <View className='w-full'>
          <MenuCategories/>
        </View>

      </View>
      {cart.length > 0 && <CartButton onPress={handleCartButtonPress} />}
      
      {/* Render CartModal with visibility and close handler */}
      <CartModal visible={isCartVisible} onClose={() => setCartVisible(false)} />
    
    </SafeAreaView>
  )
}

export default Menu