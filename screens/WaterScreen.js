import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WaterCircle from "../components/water/WaterCircle";
import WaterInput from "../components/water/WaterInput";
import WeeklyWaterChart from "../components/water/WeeklyWaterChart";

const WATER_STORAGE_KEY = "daily_water_data";

export default function WaterScreen({ route }) {
  const { userWaterGoal } = route.params;
  const [dailyWaterData, setDailyWaterData] = useState({});
  const [currentWater, setCurrentWater] = useState(0);

  useEffect(() => {
    loadWaterData();
  }, []);

  const loadWaterData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(WATER_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setDailyWaterData(parsedData);
        const today = new Date().toISOString().split("T")[0];
        setCurrentWater(parsedData[today] || 0);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données d'eau:", error);
    }
  };

  const saveWaterData = async (newData) => {
    try {
      await AsyncStorage.setItem(WATER_STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données d'eau:", error);
    }
  };

  const addWater = (amount) => {
    const today = new Date().toISOString().split("T")[0];
    const newAmount = (dailyWaterData[today] || 0) + amount;

    const newDailyData = { ...dailyWaterData, [today]: newAmount };
    setDailyWaterData(newDailyData);
    setCurrentWater(newAmount);
    saveWaterData(newDailyData);
  };

  const getGoalProgress = () => {
    return Math.min(currentWater / userWaterGoal, 1);
  };

  return (
    <View style={styles.container}>
      <WaterCircle
        currentWater={currentWater}
        totalWater={userWaterGoal}
        progress={getGoalProgress()}
      />
      <Text style={styles.waterStatus}>
        {currentWater} ml / {userWaterGoal} ml
        {currentWater > userWaterGoal &&
          ` (Objectif dépassé de ${currentWater - userWaterGoal} ml)`}
      </Text>
      <WaterInput onAddWater={addWater} />
      <WeeklyWaterChart
        waterData={dailyWaterData}
        userWaterGoal={userWaterGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  waterStatus: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    marginBottom: 100,
  },
});
