import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { transformCartToPaymentItems } from '@/utils/stripeUtils';
import { createPaymentIntent } from '../services/stripeService';

const CheckoutButton = ({ totalPrice, cart }: { totalPrice: string; cart: Array<any> }) => {
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const paymentItems = transformCartToPaymentItems(cart);
  console.log(paymentItems)
  const fetchPaymentIntent = async () => {
    try {
      const amountInCents = Math.round(parseFloat(totalPrice) * 100); 

      // const paymentIntentData = await createPaymentIntent(cart, amountInCents);

      const paymentIntentData = await fetch(
        'https://61zoynwy8k.execute-api.us-east-1.amazonaws.com/test/stripe-backend',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountInCents,
            currency: 'usd',
            cartItems: paymentItems, 
          }),
        }
      );
      // console.log(cart);
      const data = await paymentIntentData.json();
      //console.log(data);
      return data.clientSecret; 
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      Alert.alert('Error', 'Unable to fetch payment intent.');
      throw error;
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const clientSecret = await fetchPaymentIntent();


      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Taste of the Caribbean Food Market',
        applePay: {
          merchantCountryCode: 'US',
        }
      });

      if (error) {
        console.error('PaymentSheet initialization error:', error);
        Alert.alert('Error', error.message);
        setLoading(false);
        return;
      }


      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        console.error('PaymentSheet presentation error:', paymentError);
        Alert.alert('Error', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment confirmed!');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-5 mb-5 items-center z-10">
      <TouchableOpacity
        onPress={handleCheckout}
        disabled={loading}
        className={`w-11/12 h-12 rounded-lg flex-row justify-center items-center ${loading ? 'bg-gray-300' : 'bg-green-500'}`}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text className="text-white font-semibold text-lg">Checkout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutButton;
