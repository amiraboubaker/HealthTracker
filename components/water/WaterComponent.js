import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

export default function WaterComponent() {
  const [waterLevel, setWaterLevel] = useState(0); // Quantité d'eau bue en pourcentage

  const addWater = () => {
    if (waterLevel < 100) {
      setWaterLevel(waterLevel + 5); // Ajoute 50cl (5% de remplissage)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi d'eau</Text>
      <View style={styles.bottleContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 300">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#00bfff" stopOpacity="1" />
              <Stop offset="100%" stopColor="#00bfff" stopOpacity="0.5" />
            </LinearGradient>
          </Defs>
          {/* Dessine la surface de l'eau avec une ligne ondulée */}
          <Path
            d={`M 0,${300 - waterLevel * 3}
              C 25,${290 - waterLevel * 3}, 75,${310 - waterLevel * 3}, 100,${
              300 - waterLevel * 3
            }
              L 100,300 L 0,300 Z`}
            fill="url(#grad)"
          />
        </Svg>
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
