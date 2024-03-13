// App.js or your main app file
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './components/BottomNavBar'; // Your BottomTabNavigator
import ChatPage from './components/ChatBotPage'; // Your Chat screen component
import { ChatProvider } from './components/ChatContext'; // Import ChatProvider
import { navigationTheme } from './components/navigationTheme';
import NutritionTracker from './components/NutritionTracker';
import { theme } from './components/theme';

const RootStack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <ChatProvider>
      <NavigationContainer theme={navigationTheme} >
        <RootStack.Navigator >
          <RootStack.Screen
            name="Home"
            component={MyTabs}
            options={{headerShown: false }} // Hide the header for tabs
            
          />
          <RootStack.Screen
            name="Chat"
            component={ChatPage}
            // Optional: Customize the header for the Chat screen
            options={{ 
              headerTitle: 'Chat', 
              headerTintColor: theme.colors.background,
              headerStyle: {
                backgroundColor: 'white', // This sets the header background color to white
                // borderBottomLeftRadius: 20,
                // borderBottomRightRadius: 20, 
                // borderLeftWidth: 3,
                // borderRightWidth: 3,
                borderBottomWidth: 3,
                borderBottomColor: '#485beb',
                borderColor: '#485beb',
              }
            }}
          />
          <RootStack.Screen
            name="Status"
            component={NutritionTracker}
            // Optional: Customize the header for the Chat screen
            options={{ headerTitle: 'Status' }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  );
}

export default App;
