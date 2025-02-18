import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCart } from '@/Contexts/CartContext';

interface MenuItemProps {
  item_id: number;
  name: string;
  price: number;
  imageUri: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item_id, name, price, imageUri, onPress }) => {
  const { cart } = useCart();
  const cartItem = cart.find((item) => item.item_id === item_id);
  
  return (
    <TouchableOpacity  onPress={onPress}>
      <View className="flex-row items-center bg-white shadow-md rounded-lg p-4 mb-4">
        {/* Item Image */}
        <Image
          source={{ uri: imageUri }}
          className="w-16 h-16 rounded-lg mr-4"
          resizeMode="cover"
        />

        {/* Item Details */}
        <View className="flex-1">
          <Text className="font-bold text-lg">{name}</Text>
          <Text className="text-gray-600">${price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
