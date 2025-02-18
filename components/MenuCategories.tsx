import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomButton from './CustomButton';
import MenuItem from './MenuItem';
import fetchMenu from '../app/api/api';
import CartModal from './CartModal';
import CartButton from './CartButton';
import { useCart } from '@/Contexts/CartContext'; // Import the CartContext
import ItemModal from './ItemModal';

interface MenuItemData {
  item_id: number;
  item_name: string;
  item_price: number;
  item_category: string;
  item_imageUrl: string;
  item_description: string;
}

const MenuCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Starters');
  const [menuItems, setMenuItems] = useState<{ [key: string]: MenuItemData[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    item_id: number;
    item_name: string;
    item_price: number;
    item_category: string;
    item_imageUrl: string;
    item_description: string;
  }>({
    item_id: 0,
    item_name: '',
    item_price: 0,
    item_category: '',
    item_imageUrl: '',
    item_description: '',
  });

  // Use the CartContext
  const { cart, addToCart, removeFromCart } = useCart(); // Access the cart and addToCart method

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const data = await fetchMenu();
        const categorizedItems = categorizeItems(data);
        setMenuItems(categorizedItems);
        setLoading(false);
      } catch (err: any) {
        setError('Error fetching menu data');
        setLoading(false);
      }
    };

    getMenuData();
  }, []);

  const categorizeItems = (items: MenuItemData[]) => {
    const categorized = items.reduce((acc: { [key: string]: MenuItemData[] }, item) => {
      if (!acc[item.item_category]) {
        acc[item.item_category] = [];
      }
      acc[item.item_category].push(item);
      return acc;
    }, {});
    return categorized;
  };

  const handleItemPress = (item: MenuItemData) => {
    setSelectedItem({
      item_id: item.item_id,
      item_name: item.item_name,
      item_price: item.item_price,
      item_category: item.item_category,
      item_imageUrl: item.imageUrl,
      item_description: item.description,
    });
    setModalVisible(true);
  };

  const handleItemModalClose = () => {
    setModalVisible(false);
  }

  const handleAddToCart = (item: MenuItemData, quantity: number) => {
    addToCart(item); // Use addToCart from context
    setModalVisible(false);
  };
  const handleRemoveFromCart = (item: MenuItemData) => {
    removeFromCart(item.item_id);
  }

  const handleCartButtonPress = () => {
    setCartVisible(true); // Set the modal to be visible
  };

  if (loading) {
    return <Text>Loading menu...</Text>;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <CustomButton title="Retry" handlePress={() => setLoading(true)} />
      </View>
    );
  }

  const categories = Object.keys(menuItems);

  return (
    <View>
      <ScrollView className="px-10 pt-0 pb-0" horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          return (
            <CustomButton
              key={category}
              title={category}
              handlePress={() => setSelectedCategory(category)}
              containerStyles={`mr-12 bg-transparent ${selectedCategory === category ? 'border-b-4 border-green-500 text-green-500' : ''}`}
              textStyles="text-lg"
            />
          );
        })}
      </ScrollView>

      <ScrollView className="px-10 py-4">
        {selectedCategory && menuItems[selectedCategory]?.length > 0 ? (
          <View>
            {menuItems[selectedCategory].map((item) => {
              return (
                <MenuItem
                  key={item.item_id}
                  item_id={item.item_id}
                  name={item.item_name}
                  price={item.item_price}
                  imageUri={item.imageUrl}
                  onPress={() => handleItemPress(item)} // New: Open modal on press
                />
              );
            })}
          </View>
        ) : (
          <Text>No items available for this category</Text>
        )}
      </ScrollView>

      <ItemModal
        visible={isModalVisible}
        onClose={() => handleItemModalClose()}
        name={selectedItem.item_name}
        price={selectedItem.item_price}
        imageUri={selectedItem.item_imageUrl}
        description={selectedItem.item_description}
        item_id={selectedItem.item_id}
        onAddToCart={() => {
          handleAddToCart(selectedItem);
        }}
        onRemoveFromCart={() => {
          handleRemoveFromCart(selectedItem);
        }}
      />

      <CartModal visible={isCartVisible} onClose={() => setCartVisible(false)} />
    </View>
  );
};

export default MenuCategories;
