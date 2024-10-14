import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import moment from "moment"; // Utiliser la librairie moment pour la gestion des dates

export default function WeeklyWaterChart() {
  // Créer un tableau de 7 dates, en partant d'aujourd'hui et en remontant
  const getLast7Days = () => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(moment().subtract(i, "days").format("DD/MM"));
    }
    return days.reverse(); // Inverser pour avoir les dates dans l'ordre
  };

  const data = {
    labels: getLast7Days(), // Les dates remplacent les jours
    datasets: [
      {
        data: [1500, 2000, 1800, 2500, 2200, 1900, 2100], // Valeurs fictives
      },
    ],
  };

  return (
    <View>
      <Text style={styles.chartTitle}>
        Quantité d'eau bue durant la semaine
      </Text>
      <BarChart
        data={data}
        width={Dimensions.get("window").width - 30} // Largeur du graphique
        height={220}
        yAxisSuffix="ml"
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        verticalLabelRotation={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
