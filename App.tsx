import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './components/BottomNavBar'; // Assuming the .tsx extension, no need to specify it
import { navigationTheme } from './components/navigationTheme';

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={navigationTheme}>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;