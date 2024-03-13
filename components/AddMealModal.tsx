import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const AddMealModal = ({ visible, onClose, onAddMeal, initialMeal }) => {
  const [meal, setMeal] = useState({
    name: '',
    description: '',
    calories: '0', // Change to string to keep input types consistent
    protein: '0',
    carbs: '0',
    fat: '0',
  });

  useEffect(() => {
    // Reset state when the modal is closed or when switching from edit to add mode
    if (!visible || !initialMeal) {
      setMeal({ name: '', description: '', calories: '0', protein: '0', carbs: '0', fat: '0' });
    } else if (visible && initialMeal) {
      // If we have an initialMeal and the modal is open, populate the fields for editing
      setMeal({
        name: initialMeal.name || '',
        description: initialMeal.description || '',
        calories: initialMeal.calories.toString(),
        protein: initialMeal.protein?.toString() || '0',
        carbs: initialMeal.carbs?.toString() || '0',
        fat: initialMeal.fat?.toString() || '0',
      });
    }
  }, [visible, initialMeal]);

  const handleSubmit = () => {
    onAddMeal({
      ...meal,
      calories: parseInt(meal.calories, 10),
      protein: parseInt(meal.protein, 10),
      carbs: parseInt(meal.carbs, 10),
      fat: parseInt(meal.fat, 10),
    });
    onClose();
    // Reset form only if not in edit mode to prevent flickering
    if (!initialMeal) {
      setMeal({ name: '', description: '', calories: '0', protein: '0', carbs: '0', fat: '0' });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          value={meal.name}
          onChangeText={(text) => setMeal({ ...meal, name: text })}
        />
        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          value={meal.description}
          onChangeText={(text) => setMeal({ ...meal, description: text })}
        />
        <Text>Calories:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={meal.calories.toString()}
          onChangeText={(text) => setMeal({ ...meal, calories: text })}
        />
        <Text>Protein (g):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={meal.protein.toString()}
          onChangeText={(text) => setMeal({ ...meal, protein: text })}
        />
        <Text>Carbs (g):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={meal.carbs.toString()}
          onChangeText={(text) => setMeal({ ...meal, carbs: text })}
        />
        <Text>Fat (g):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={meal.fat.toString()}
          onChangeText={(text) => setMeal({ ...meal, fat: text })}
        />
        <CustomButton title="Add Meal" onPress={handleSubmit} />
        <CustomButton title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  // Add more styles as needed
});

export default AddMealModal;
