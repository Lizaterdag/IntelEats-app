import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import NutritionalIntakeSummary from './NutritionalIntakeSummary';
import CustomButton from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from './theme';

const Homepage = ({ navigation }) => {
    const [currentIntake, setCurrentIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    });
    const today = new Date().toISOString().slice(0, 10); // Format today's date as YYYY-MM-DD
    const month = new Date().getMonth()+1;
    const date = new Date().toLocaleString('default', { month: "long" });

    useEffect(() => {
        const fetchTodaysMeals = async () => {
            try {
            const storedMeals = await AsyncStorage.getItem('meals');
            const meals = storedMeals ? JSON.parse(storedMeals) : [];
            const todaysMeals = meals.filter(meal => meal.date === today);
            calculateCurrentIntake(todaysMeals);
            } catch (error) {
            Alert.alert("Error", "Failed to load meals data.");
            }
        };

        fetchTodaysMeals();
    }, []);

    // Function to calculate and set the current intake
    const calculateCurrentIntake = (meals) => {
        const intake = meals.reduce((acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fat: acc.fat + meal.fat,
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        setCurrentIntake(intake);
    };

  return (  
    <LinearGradient
      colors={['#ffcf87', '#485beb']}
      style={{flex: 1}}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerDate}>{date + " " + month}</Text>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello, User</Text>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('./placeholder_pic.jpeg')}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.bodyContainer}>
            <View style={styles.pullTab} />
            <CustomButton
              title="Chat With Your Nutritionist!"
              onPress={() => navigation.navigate('Chat')}
            />
            <Text style={styles.header}>Today's Intake</Text>
            <NutritionalIntakeSummary currentIntake={currentIntake}/>
            <CustomButton
              title="See more..."
              onPress={() => navigation.navigate('Status')}
            />

            <Text style={styles.header}>Blog Posts</Text>
            {/* Fetch and display a couple of blog posts here */}
            <CustomButton
                title="View All Blog Posts"
                onPress={() => navigation.navigate('Blog')}
            />
          </View>
      </ScrollView>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      paddingTop: 0,
      // backgroundColor: '#485beb',
      // paddingHorizontal: 16,
  },
  contentContainer: {
      paddingBottom: 60, // Adjust this value based on the height of your bottom navbar
      // You can also add other styling here that you want to apply to the content of the ScrollView
      // alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0, // Ensure it's at the top
    left: 0, // Align to the left
    right: 0, // Align to the right
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    // flexDirection: 'row',
    // Other styling...
  },
  headerDate: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  bodyContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 10,
    marginTop: 140,
    borderRadius: 35,
    zIndex: 5,
    // Other styling...
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Other styling...
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    // Other styling...
  },
  profileImageContainer: {
    // Styling for the profile image container...
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // Other styling...
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  pullTab: {
    alignSelf: 'center', // Center the pull-tab horizontally.
    width: 40, // Width of the pull-tab indicator.
    height: 5, // Height of the pull-tab indicator.
    borderRadius: 2.5, // Half the height to make it a rounded line.
    backgroundColor: '#CDCDCD', // Color of the pull-tab indicator.
    marginBottom: 10, // Space between the pull-tab and the rest of the content.
  },
  // Add additional styles as needed
});

export default Homepage;
