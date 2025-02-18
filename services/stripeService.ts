// services/stripeService.ts

export const createPaymentIntent = async (paymentItems: any[], amountInCents: number) => {
    const response = await fetch(
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
  
    if (!response.ok) {
      throw new Error('Payment intent creation failed');
    }
  
    return response.json();  // Assuming the backend sends back the payment intent details
  };
  