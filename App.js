// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetStartedScreen from "./screens/GetStartedScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainNavigator from "./components/MainNavigator"; // We'll create this

const Stack = createStackNavigator();

const App = () => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("loggedIn");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Parsed Data: ", parsedData);
          if (parsedData === "True") {
            setRoute("Main"); // Navigate to Main if logged in
          } else {
            setRoute("SignIn");
          }
        } else {
          setRoute("SignIn");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage: ", error);
      }
    };

    fetchData();
  }, []);

  if (route === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={route}
        screenOptions={{ headerShown: false }}
      >
        {/* Auth Stack */}
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: true, headerTitle: "" }}
        />
        {/* Main App Stack */}
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
