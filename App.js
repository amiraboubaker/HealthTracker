import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GetStartedScreen from './screens/GetStartedScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        {/* GetStartedScreen: header hidden */}
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}  // Hides the header
        />
        
        {/* Other screens with customized header */}
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Welcome' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
