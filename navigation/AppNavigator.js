// AppNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CoachScreen from "../screens/CoachScreen";
import FoodScreen from "../screens/FoodScreen";
import GetStartedScreen from "../screens/GetStartedScreen";
import SleepScreen from "../screens/SleepScreen";
import WaterScreen from "../screens/WaterScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Water") {
              iconName = "water-outline";
            } else if (route.name === "Food") {
              iconName = "food-outline";
            } else if (route.name === "Sleep") {
              iconName = "sleep";
            } else if (route.name === "Coach") {
              iconName = "account-tie-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#00bfff",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Water"
          component={WaterScreen}
          initialParams={{ userWaterGoal: 2000 }} // Example parameter
        />
        <Tab.Screen name="Food" component={FoodScreen} />
        <Tab.Screen name="Sleep" component={SleepScreen} />
        <Tab.Screen name="Coach" component={CoachScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
