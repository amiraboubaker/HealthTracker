// navigation/MainNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import WaterScreen from "../screens/WaterScreen";
import FoodScreen from "../screens/FoodScreen";
import SleepScreen from "../screens/SleepScreen";
import CoachScreen from "../screens/CoachScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Water":
              iconName = "water-outline";
              break;
            case "Food":
              iconName = "food-outline";
              break;
            case "Sleep":
              iconName = "sleep";
              break;
            case "Coach":
              iconName = "account-tie-outline";
              break;
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
        initialParams={{ userWaterGoal: 2000 }}
      />
      <Tab.Screen name="Food" component={FoodScreen} />
      <Tab.Screen name="Sleep" component={SleepScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
