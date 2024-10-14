import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function WaterInput({ onAddWater }) {
  const [waterInput, setWaterInput] = useState("");

  const handleAddWater = () => {
    const inputWater = parseInt(waterInput) || 0;
    if (inputWater > 0) {
      onAddWater(inputWater);
    }
    setWaterInput(""); // Réinitialiser l'input après l'ajout
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Entrez la quantité d'eau (cl)"
        keyboardType="numeric"
        value={waterInput}
        onChangeText={setWaterInput}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddWater}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#00bfff",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
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
