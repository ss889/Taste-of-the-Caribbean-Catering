import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useCart } from '@/Contexts/CartContext'; // Access cart context
import CheckoutButton from './CheckoutButton';
import { PlatformPayButton, isPlatformPaySupported, PlatformPay } from '@stripe/stripe-react-native';

const CartModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const { cart } = useCart(); // Get the cart items from context
  const screenHeight = Dimensions.get('window').height;

  // Calculate the total price of the cart
  const totalPrice = cart.reduce((total, item) => total + item.item_price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true} // Ensure transparent background
    >
      {/* Modal content */}
      <View
          className="absolute bottom-0 w-full bg-white rounded-t-3xl p-5"
          style={{ height: screenHeight * 0.6 }} // Use 60% of the screen height
        >
        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 16, // Adjust to fit your design
            right: 16,
            backgroundColor: 'green',
            width: 40, // Size for better touch area
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20, // Rounded
            zIndex: 10, // Ensure it's above other elements
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>X</Text>
        </TouchableOpacity>

        {/* Cart Content */}
        <View className="flex-1 mb-2">
          <Text className="text-2xl font-bold mb-3">Your Cart</Text>

          {cart.length > 0 ? (
            <ScrollView className="max-h-[70%]">
              {cart.map((item, index) => (
                <View key={index} className="flex-row justify-between my-2">
                  <Text className="text-lg">{item.item_name} x {item.quantity}</Text>
                  <Text className="text-lg">${(item.item_price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
              <Text className="text-xl font-bold mt-4">Total: ${totalPrice}</Text>
            </ScrollView>
          ) : (
            <Text className="text-lg italic text-gray-500">Your cart is empty</Text>
          )}
        </View>

        {/* Action Button */}
        {cart.length > 0 && (
          <View className="mt-3">

        {/* {!isApplePaySupported && (
          <PlatformPayButton
            onPress={onClose}
            type={PlatformPay.ButtonType.Order}
            appearance={PlatformPay.ButtonStyle.Black}
            borderRadius={4}
            style={{
              width: '100%',
              height: 50,
        }}
        />
      )} */}

            <CheckoutButton totalPrice={totalPrice} cart={cart} />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CartModal;
