import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addItem, updateItem, getInventory } from '../database/database';

export default function AddScreen({ route, navigation }: any) {
  const itemId = route.params?.id;
  const isEditing = !!itemId;

  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [oldImageUri, setOldImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      const allItems = getInventory();
      const currentItem = allItems.find(item => item.id === itemId);

      if (currentItem) {
        setName(currentItem.name);
        setStock(currentItem.stock.toString());
        setImageUri(currentItem.image_uri);
        setOldImageUri(currentItem.image_uri);
      }
    }
  }, [itemId, isEditing]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !stock.trim()) {
      Alert.alert('Validation Error', 'Name and stock are required!');
      return;
    }

    const stockNumber = parseInt(stock, 10);
    if (isNaN(stockNumber) || stockNumber < 0) {
      Alert.alert('Validation Error', 'Stock must be a valid positive number!');
      return;
    }

    try {
      if (isEditing) {
        await updateItem(itemId, name, stockNumber, imageUri, oldImageUri);
      } else {
        await addItem(name, stockNumber, imageUri);
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Database Error', 'Failed to save the item.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-base font-semibold text-slate-800 mb-2">
          Item Name
        </Text>
        <TextInput
          className="border border-slate-200 rounded-xl p-4 text-base mb-6 bg-slate-50 text-slate-800"
          value={name}
          onChangeText={setName}
          placeholder="e.g., Lenovo ThinkPad"
          placeholderTextColor="#94a3b8"
        />

        <Text className="text-base font-semibold text-slate-800 mb-2">
          Stock Quantity
        </Text>
        <TextInput
          className="border border-slate-200 rounded-xl p-4 text-base mb-8 bg-slate-50 text-slate-800"
          value={stock}
          onChangeText={setStock}
          placeholder="e.g., 15"
          keyboardType="numeric"
          placeholderTextColor="#94a3b8"
        />

        <View className="items-center mb-10">
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-48 rounded-2xl mb-4 border border-slate-200"
            />
          ) : (
            <View className="w-full h-48 bg-slate-50 rounded-2xl border border-dashed border-slate-300 justify-center items-center mb-4">
              <Text className="text-slate-400 font-medium">
                No Image Selected
              </Text>
            </View>
          )}

          <View className="flex-row gap-4 w-full justify-center mt-2">
            <TouchableOpacity
              onPress={pickImage}
              className="bg-slate-100 px-6 py-3 rounded-xl border border-slate-200 flex-1 items-center"
            >
              <Text className="text-slate-700 font-semibold text-sm">
                Pick Image
              </Text>
            </TouchableOpacity>

            {imageUri && (
              <TouchableOpacity
                onPress={() => setImageUri(null)}
                className="bg-red-50 px-6 py-3 rounded-xl border border-red-100 flex-1 items-center"
              >
                <Text className="text-red-600 font-semibold text-sm">
                  Clear Image
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className="bg-slate-900 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-base">
            {isEditing ? 'Update Item' : 'Save Item'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
