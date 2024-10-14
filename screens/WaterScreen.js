import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import WaterCircle from "../components/water/WaterCircle";
import WaterInput from "../components/water/WaterInput";
import WeeklyWaterChart from "../components/water/WeeklyWaterChart";
export default function WaterScreen({ route }) {
  const { userWaterGoal } = route.params;
  const totalWater = userWaterGoal; // Capacité totale (exemple : 2500 pour 2,5 litres)
  const [currentWater, setCurrentWater] = useState(0); // Quantité actuelle d'eau bue

  const addWater = (amount) => {
    if (currentWater + amount <= totalWater) {
      setCurrentWater(currentWater + amount);
    }
  };

  return (
    <View style={styles.container}>
      <WaterCircle currentWater={currentWater} totalWater={totalWater} />
      <WaterInput onAddWater={addWater} />
      <WeeklyWaterChart />
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
});
