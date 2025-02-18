import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for the MenuItem and CartItem
export interface MenuItemData {
  item_id: number;
  item_name: string;
  item_price: number;
  item_category: string;
  item_imageUrl: string;
}

export interface CartItem extends MenuItemData {
  quantity: number;
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItemData) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

// Type for the provider's props
interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartContext Provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to the cart
  const addToCart = (item: MenuItemData, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item_id === item.item_id);
  
      if (existingItem) {
        // Update the quantity of the existing item
        return prevCart.map((cartItem) =>
          cartItem.item_id === item.item_id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + quantity }
            : cartItem
        );
      }
  
      // Add a new item with the specified quantity
      return [...prevCart, { ...item, quantity }];
    });
  };
  

const removeFromCart = (itemId: number) => {
  setCart((prevCart) =>
    prevCart
      .map((cartItem) =>
        cartItem.item_id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0) // Remove items with 0 quantity
  );
};

  // Update quantity of an item
  const updateQuantity = (itemId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item_id === itemId ? { ...cartItem, quantity: Math.max(1, quantity) } : cartItem
      )
    );
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
