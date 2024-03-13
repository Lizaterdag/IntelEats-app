import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddMealModal from './AddMealModal';
import NutritionalIntakeSummary from './NutritionalIntakeSummary';
import CustomButton from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';

// Meal summary component
const MealSummary = ({ meal, onEdit, onDelete }) => {
  return (
    <View style={styles.mealContainer}>
      <Text style={styles.mealName}>{meal.name}</Text>
      <Text style={styles.mealDescription}>{meal.description}</Text>
      <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
      <View style={styles.actionsContainer}>
        <Button title="Edit" onPress={() => onEdit(meal)} />
        <Button title="Delete" onPress={() => onDelete(meal)} />
      </View>
    </View>
  );
};

const NutritionTracker = () => {
  const [meals, setMeals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [editingMeal, setEditingMeal] = useState(null); // null when adding, meal object when editing
  const filteredMeals = meals.filter(meal => meal.date === selectedDate);

  const currentIntake = filteredMeals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + (meal.protein || 0),
    carbs: acc.carbs + (meal.carbs || 0),
    fat: acc.fat + (meal.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => {
    const loadMealsData = async () => {
      try {
        const storedMeals = await AsyncStorage.getItem('meals');
        if (storedMeals !== null) {
          setMeals(JSON.parse(storedMeals));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load meals data.");
      }
    };

    loadMealsData();
  }, [selectedDate]);

  const openAddModal = () => {
    setEditingMeal(null); // Ensure we're in "add mode" by clearing any existing editing state
    setIsModalVisible(true);
  };

  const handleDeleteMeal = async (mealToDelete) => {
    const updatedMeals = meals.filter(meal => meal !== mealToDelete);
    try {
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
    } catch (error) {
      Alert.alert("Error", "Failed to delete the meal.");
    }
  };

  const openEditModal = (meal) => {
    setEditingMeal(meal);
    setIsModalVisible(true);
  };

  const handleAddOrEditMeal = async (meal) => {
    let updatedMeals;
  
    if (editingMeal) {
      // Editing an existing meal
      updatedMeals = meals.map(m => (m.id === editingMeal.id ? { ...meal, id: editingMeal.id, date: editingMeal.date } : m));
    } else {
      // Adding a new meal, ensure date is set to selectedDate
      const newMeal = { ...meal, id: new Date().getTime(), date: selectedDate };
      updatedMeals = [...meals, newMeal];
    }
  
    try {
      await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
      setMeals(updatedMeals);
    } catch (error) {
      Alert.alert("Error", "Failed to save the meal.");
    } finally {
      setIsModalVisible(false);
      setEditingMeal(null);
    }
  };    

  const formatDateDisplay = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    const dateObj = new Date(date);
    const formattedToday = today.toISOString().slice(0, 10);
    const formattedYesterday = yesterday.toISOString().slice(0, 10);
    const formattedDateObj = dateObj.toISOString().slice(0, 10);
  
    if (formattedDateObj === formattedToday) {
      return "Today";
    } else if (formattedDateObj === formattedYesterday) {
      return "Yesterday";
    } else {
      // Format the date as you wish to display for other dates
      return dateObj.toLocaleDateString();
    }
  };

  // Function to navigate to the next or previous day
  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    const today = new Date();
    
    // Ensure the new date is not in the future
    if (newDate > today) {
      return;
    }
    
    setSelectedDate(newDate.toISOString().slice(0, 10));
  };

  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setIsNextDisabled(selectedDate >= today);
  }, [selectedDate]);

  return (
    <LinearGradient
      colors={['#ffcf87', '#485beb']}
      style={{flex: 1}}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.dateNavigation}>
          <CustomButton title="<" onPress={() => changeDate(-1)} />
          <Text style={styles.dateText}>{formatDateDisplay(selectedDate)}</Text>
          <CustomButton title=">" onPress={() => changeDate(1) } disabled={isNextDisabled}/>
        </View>
        <NutritionalIntakeSummary currentIntake={currentIntake} />
        <View style={styles.mealsContainer}>
          {filteredMeals.map((meal, index) => (
            <MealSummary
              key={index}
              meal={meal}
              onEdit={() => openEditModal(meal)}
              onDelete={() => handleDeleteMeal(meal)}
            />
          ))}
        </View>
        <CustomButton title="Add Meal" onPress={openAddModal} />
        <AddMealModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setEditingMeal(null); // Reset editing meal upon closing
          }}
          onAddMeal={handleAddOrEditMeal}
          initialMeal={editingMeal} // Make sure this prop is being passed
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 60, // Adjust this value based on the height of your bottom navbar
    // You can also add other styling here that you want to apply to the content of the ScrollView
    // alignItems: 'center',
  },
  header: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold', // Bold font weight
    color: '#333', // Text color,
    marginTop: 20, // Margin at the top for spacing
  },
  mealsContainer: {
    marginTop: 10,
    // paddingHorizontal: 16,
  },
  mealContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  mealName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  mealCalories: {
    fontSize: 14,
    color: '#333',
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  dateText: {
    marginHorizontal: 20, // Provide some space between the buttons and the date text
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  // Add more styles here as needed
});

export default NutritionTracker;