import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Example of a daily nutrition goals object
const dailyGoals = {
    calories: 2000,
    protein: 150, // grams
    carbs: 250, // grams
    fat: 70, // grams
};

const NutritionalIntakeSummary = ({ currentIntake }) => {
  const calorieProgress = (currentIntake.calories / dailyGoals.calories) * 100;
  const caloriesLeft = dailyGoals.calories - currentIntake.calories;

  const MacroCircle = ({ nutrient='', goal=0, intake=0 }) => {
    const left = goal - intake;
    const progress = (intake / goal) * 100;
  
    return (
      <View style={styles.macroContainer}>
        <AnimatedCircularProgress
          size={100}
          width={8}
          fill={progress}
          tintColor="#485beb"
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

  return (
    <View>
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={180}
          width={15}
          fill={calorieProgress}
          tintColor="#485beb"
          backgroundColor="#E0E0E0"
          padding={5}
        >
          {fill => (
            <Text style={styles.progressText}>
              {caloriesLeft} kcal left
            </Text>
          )}
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
    </View>
  );
};

const styles = StyleSheet.create({
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
        color: '#485beb',
    },
    intakeContainer: {
        marginLeft: 20,
        alignItems: 'center',
    },
    intakeText: {
        fontSize: 18,
        color: '#485beb',
        marginBottom: 5,
    },
    intakeNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#485beb',
    },
    macroText: {
        fontSize: 16,
        color: '#485beb',
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
        color: '#485beb',
        fontWeight: 'bold',
    },
})

export default NutritionalIntakeSummary;