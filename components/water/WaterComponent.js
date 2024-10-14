import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WaterComponent() {
  const [waterLevel, setWaterLevel] = useState(0);

  const addWater = () => {
    if (waterLevel < 100) {
      setWaterLevel(waterLevel + 5);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi d'eau</Text>
      <View style={styles.bottleContainer}>
        <View style={[styles.water, { height: `${waterLevel}%` }]} />
      </View>
      <Text style={styles.waterText}>{waterLevel * 10}cl / 1000cl</Text>
      <TouchableOpacity style={styles.button} onPress={addWater}>
        <Text style={styles.buttonText}>Ajouter 50cl</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottleContainer: {
    width: 100,
    height: 300,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  },
  water: {
    width: "100%",
    backgroundColor: "#00bfff",
  },
  waterText: {
    marginVertical: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
