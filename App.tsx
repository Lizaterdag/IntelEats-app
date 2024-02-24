/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { useNavigation, RouteProp, NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';


type SectionProps = {
  title: string;
  children: React.ReactNode;
};

// Define the type for your Stack navigator
type RootStackParamList = {
  Login: undefined; // Add any other screen names as needed
  Register: undefined;
};

// Define the navigation prop type for LoginScreen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


function Section({ children, title }: SectionProps): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   // materialui 4 
//   // redux, react native contexts
//   // postgres json files

function LoginScreen(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Explicitly define the type

  const handleLogin = () => {
    if (username === 'demo' && password === 'password') {
      alert('Login successful!');
      // Navigate to the main app screen or another screen after successful login
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = () => {
    // Navigate to the registration screen
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />
        <View style={styles.content}>
          <Section title="Login">
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </Section>
          <Section title="Register">
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  content: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  registerButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Adjust the margin as needed
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
