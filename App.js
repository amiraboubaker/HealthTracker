import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import GetStartedScreen from "./screens/GetStartedScreen";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SleepScreen from "./screens/SleepScreen";
import WaterScreen from "./screens/WaterScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sleep">
        {/* GetStartedScreen: header hidden */}
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }} // Hides the header
        />

        {/* Other screens with customized header */}
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sleep"
          component={SleepScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Water"
          component={WaterScreen}
          initialParams={{ userWaterGoal: 2000 }} // Ici tu définis les paramètres
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
