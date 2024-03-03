import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NutritionTracker from './NutritionTracker';
import BlogPage from './BlogPage';
import ChatBotPage from './ChatBotPage';
import { theme } from './theme';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
            initialRouteName="Status"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: theme.colors.primary, // Use theme color
                tabBarInactiveTintColor: 'white',
                tabBarStyle: { backgroundColor: theme.colors.background }, // Style the tab bar itself
            })}
        >
            <Tab.Screen 
                name="Blog" 
                component={BlogPage}
                options={{ tabBarLabel: 'Blog' }} // Optional: customize the label
            />
            <Tab.Screen 
                name="Chat" 
                component={ChatBotPage} 
                options={{ tabBarLabel: 'Chat' }}
            />
            <Tab.Screen 
                name="Status" 
                component={NutritionTracker} 
                options={{ tabBarLabel: 'Status' }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
