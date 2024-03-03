import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


// Example of a daily nutrition goals object
const dailyGoals = {
  calories: 2000,
  protein: 150, // grams
  carbs: 250, // grams
  fat: 70, // grams
};

// Example of current intake for the day
const currentIntake = {
  calories: 1400,
  protein: 80,
  carbs: 150,
  fat: 40,
};

const calculateLeft = (goals: { calories: any; protein: any; carbs: any; fat: any; }, intake: { calories: any; protein: any; carbs: any; fat: any; }) => {
  return {
    calories: goals.calories - intake.calories,
    protein: goals.protein - intake.protein,
    carbs: goals.carbs - intake.carbs,
    fat: goals.fat - intake.fat,
  };
};

const MacroCircle = ({ nutrient='', goal=0, intake=0 }) => {
  const left = goal - intake;
  const progress = (intake / goal) * 100;

  return (
    <View style={styles.macroContainer}>
      <AnimatedCircularProgress
        size={100}
        width={8}
        fill={progress}
        tintColor="#6200EE"
        backgroundColor="#E0E0E0"
        padding={10}>
        {
          (fill) => (
            <Text style={styles.macroText}>
              {left}g left
            </Text>
          )
        }
      </AnimatedCircularProgress>
      <Text style={styles.macroLabel}>{nutrient}</Text>
    </View>
  );
};

// Example meal data for the day
const meals = [
  {
    name: 'Breakfast',
    description: 'Oatmeal with honey and berries',
    calories: 300
  },
  {
    name: 'Lunch',
    description: 'Grilled chicken salad with vinaigrette',
    calories: 400
  },
  {
    name: 'Snack',
    description: 'Greek yogurt with nuts',
    calories: 200
  },
  {
    name: 'Dinner',
    description: 'Salmon with quinoa and steamed veggies',
    calories: 500
  }
];

// Meal summary component
const MealSummary = ({ meal }) => {
  return (
    <View style={styles.mealContainer}>
      <Text style={styles.mealName}>{meal.name}</Text>
      <Text style={styles.mealDescription}>{meal.description}</Text>
      <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
    </View>
  );
};

const NutritionTracker = () => {
  const caloriesLeft = dailyGoals.calories - currentIntake.calories;
  const left = calculateLeft(dailyGoals, currentIntake);
  const calorieProgress = (currentIntake.calories / dailyGoals.calories) * 100;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={180}
          width={15}
          fill={calorieProgress}
          tintColor="#6200EE"
          backgroundColor="#E0E0E0"
          padding={5}>
          {
            (fill) => (
              <Text style={styles.progressText}>
                {caloriesLeft} kcal left
              </Text>
            )
          }
        </AnimatedCircularProgress>
        <View style={styles.intakeContainer}>
          <Text style={styles.intakeText}>Eaten</Text>
          <Text style={styles.intakeNumber}>{currentIntake.calories} kcal</Text>
        </View>
      </View>
      <View style={styles.macrosProgressContainer}>
        <MacroCircle nutrient="Carbs" goal={dailyGoals.carbs} intake={currentIntake.carbs} />
        <MacroCircle nutrient="Protein" goal={dailyGoals.protein} intake={currentIntake.protein} />
        <MacroCircle nutrient="Fat" goal={dailyGoals.fat} intake={currentIntake.fat} />
      </View>
      <Text style={styles.header}> Todays Meals </Text>
      <View style={styles.mealsContainer}>
        {meals.map((meal, index) => (
          <MealSummary key={index} meal={meal} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 10, // Adjust this value based on the height of your bottom navbar
    // You can also add other styling here that you want to apply to the content of the ScrollView
    // alignItems: 'center',
  },
  header: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold', // Bold font weight
    color: '#333', // Text color,
    marginTop: 20, // Margin at the top for spacing
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  progressText: {
    fontSize: 21,
    color: '#6200EE',
  },
  intakeContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  intakeText: {
    fontSize: 18,
    color: '#6200EE',
    marginBottom: 5,
  },
  intakeNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  macroText: {
    fontSize: 16,
    color: '#6200EE',
    marginBottom: 5,
  },
  macrosProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  macroContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  macroLabel: {
    marginTop: 5,
    fontSize: 16,
    color: '#6200EE',
    fontWeight: 'bold',
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
  // Add more styles here as needed
});

export default NutritionTracker;