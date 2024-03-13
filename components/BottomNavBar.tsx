import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NutritionTracker from './NutritionTracker';
import BlogPage from './BlogPage';
import { theme } from './theme';
import Homepage from './Homepage';
import Icon from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
            initialRouteName="HomeStack"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: theme.colors.background, // Use theme color
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: { 
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20, 
                    borderLeftWidth: 3,
                    borderRightWidth: 3,
                    borderTopWidth: 3,
                    borderTopColor: '#485beb',
                    borderColor: '#485beb',
                    shadowOpacity: 0.1, // Shadow for iOS
                    shadowRadius: 5,
                    shadowOffset: { width: 0, height: -5 },
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = 'home';
                    } else if (route.name === 'Blog') {
                        iconName = 'share-alt';
                    } else if (route.name === 'Status') {
                        iconName = 'tasks';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={22} color={color} />;
                },
            })}
        >
            <Tab.Screen 
                name="HomeStack" 
                component={Homepage}
                options={{ 
                    title: 'Home', 
                    headerShown: false, 
                }} // Optional: customize the label
            />
            <Tab.Screen 
                name="Blog" 
                component={BlogPage}
                options={{ tabBarLabel: 'Blog', headerShown: false }} // Optional: customize the label
            />
            {/* <Tab.Screen 
                name="Chat" 
                component={ChatBotPage} 
                options={{ tabBarLabel: 'Chat' }}
            /> */}
            <Tab.Screen 
                name="Status" 
                component={NutritionTracker} 
                options={{ tabBarLabel: 'Status', headerShown: false }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;
