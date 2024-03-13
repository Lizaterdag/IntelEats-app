import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './Homepage';
import ChatPage from './ChatBotPage';
// Import other screens if necessary

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" 
        component={Homepage} 
        options={({ route }) => ({
            headerShown: false, // Hides the header
            tabBarVisible: false, // This option must be set in the Tab Navigator's screen options
        })}
      />
      {/* Add other screens to the stack as needed */}
    </Stack.Navigator>
    
  );
}

export default MainStackNavigator;