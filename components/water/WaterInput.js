import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function WaterInput({ onAddWater }) {
  const waterAmounts = [50, 100, 200, 300, 500]; // Quantités en ml

  return (
    <View style={styles.inputContainer}>
      {waterAmounts.map((amount) => (
        <TouchableOpacity
          key={amount}
          style={styles.button}
          onPress={() => onAddWater(amount)}
        >
          <Text style={styles.buttonText}>{amount} ml</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
