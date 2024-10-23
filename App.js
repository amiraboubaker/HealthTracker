import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import GetStartedScreen from "./screens/GetStartedScreen";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import WaterScreen from "./screens/WaterScreen";
import SleepScreen from "./screens/SleepScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parse } from "react-native-svg";

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
            setRoute("Home");
          } else {
            setRoute("GetStarted");
          }
        } else {
          setRoute("GetStarted");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage: ", error);
      }
    };

    fetchData();
  }, []);

  // Render nothing until the route is determined
  if (route === null) {
    return null; // Or you can return a loading indicator if you prefer
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={route}>
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
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Sleep"
          component={SleepScreen}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: "Welcome" }}
        />
        <Stack.Screen
          name="Water"
          component={WaterScreen}
          initialParams={{ userWaterGoal: 2000 }} // Pass parameters here
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
