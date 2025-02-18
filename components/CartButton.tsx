import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCart } from '@/Contexts/CartContext'; // Assuming you're using CartContext

const CartButton = ({ onPress }: { onPress: () => void }) => {
  const { cart } = useCart(); // Access cart from context

  // Calculate the number of items in the cart and the total price
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.item_price * item.quantity, 0).toFixed(2);

  return (
    <TouchableOpacity
      onPress={onPress} // Trigger onPress function passed from parent component
      style={{
        width: '100%', // Full width or customize width
        height: 60, // Set button height
        backgroundColor: '#10B981', // Green color like DoorDash cart button
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderRadius: 30, // Rounded corners
        marginTop: 16, // Spacing between buttons
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' }}>
          {itemCount} Items
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' }}>
          ${totalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;
