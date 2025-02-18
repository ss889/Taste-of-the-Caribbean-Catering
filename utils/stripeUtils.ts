// Define a type for the cart item
type CartItem = {
    item_name: string;
    item_price: number;
    quantity: number;
  };
  
  // Define a type for the payment item
  type PaymentItem = {
    label: string;
    amount: string; // Stripe expects string amounts in their API
    paymentType: 'Immediate'; // Stripe PlatformPay.PaymentType
  };
  
  // Conversion function
  export const transformCartToPaymentItems = (cart: CartItem[]): PaymentItem[] => {
    const subtotal = cart.reduce((total, item) => total + item.item_price * item.quantity, 0);
    const tax = parseFloat((subtotal * 0.07).toFixed(2)); // Example: 7% tax
    const tip = parseFloat((subtotal * 0.15).toFixed(2)); // Example: 15% tip
    const total = parseFloat((subtotal + tax + tip).toFixed(2));
  
    // Map cart items to payment items
    const paymentItems: PaymentItem[] = cart.map((item) => ({
      label: item.item_name,
      amount: (item.item_price * item.quantity).toFixed(2),
      paymentType: 'Immediate',
    }));
  
    // Add subtotal, tax, tip, and total to payment items
    paymentItems.push(
      { label: 'Subtotal', amount: subtotal.toFixed(2), paymentType: 'Immediate' },
      { label: 'Tax', amount: tax.toFixed(2), paymentType: 'Immediate' },
      { label: 'Tip', amount: tip.toFixed(2), paymentType: 'Immediate' },
      { label: 'Total', amount: total.toFixed(2), paymentType: 'Immediate' }
    );
  
    return paymentItems;
  };
  