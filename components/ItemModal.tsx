import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useCart } from '@/Contexts/CartContext';

interface ItemModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  price: number;
  imageUri: string;
  description: string;
  onAddToCart: (quantity: number) => void; // Callback with quantity
}

const ItemModal: React.FC<ItemModalProps> = ({
  visible,
  onClose,
  name,
  price,
  imageUri,
  description,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false} // Ensures it covers the full screen
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{name}</Text>
        </View>

        {/* Image Section */}
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />

        {/* Content Section */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <Text style={styles.description}>{description}</Text>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
            <View>
                <TouchableOpacity onPress={addToCart}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => onAddToCart(quantity)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>
              Add to Cart ${((quantity * price) || 0).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ItemModal;

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
    color: '#000',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    backgroundColor: '#e9ecef',
  },
  content: {
    padding: 16,
    paddingBottom: 24, // Leave space for footer
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  quantityButton: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  quantityValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});




// {cartItem ? (
//     <View className="flex-row items-center">
//     <TouchableOpacity
//       onPress={onRemoveFromCart} // Reduce quantity or remove from cart
//       className="bg-red-500 px-3 py-1 rounded-lg"
//     >
//       <Text className="text-white font-bold">-</Text>
//     </TouchableOpacity>
//     <Text className="mx-4">{cartItem.quantity}</Text>
//     <TouchableOpacity
//       onPress={onAddToCart} // Increment quantity
//       className="bg-green-500 px-3 py-1 rounded-lg"
//     >
//       <Text className="text-white font-bold">+</Text>
//     </TouchableOpacity>
//   </View>

//  ) : (
//    <TouchableOpacity
//      onPress={onAddToCart}
//      className="bg-green-500 px-4 py-2 rounded-lg"
//    >
//      <Text className="text-white font-bold">Add</Text>
//    </TouchableOpacity>
//  )}