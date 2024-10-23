// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import WaterScreen from "../screens/WaterScreen";
import FoodScreen from "../screens/FoodScreen";
import SleepScreen from "../screens/SleepScreen";
import CoachScreen from "../screens/CoachScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
