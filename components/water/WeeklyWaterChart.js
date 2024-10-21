import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import moment from "moment";

export default function WeeklyWaterChart({ waterData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const { labels, data, max } = processDataForChart(waterData);
    setChartData({
      labels: labels,
      datasets: [{ data: data }],
    });
    setMaxValue(max);
  }, [waterData]);

  const processDataForChart = (data) => {
    const last7Days = getLast7Days();
    const chartData = last7Days.map((date) => {
      const formattedDate = moment(date, "DD/MM").format("YYYY-MM-DD");
      return data[formattedDate] || 0;
    });

    const max = Math.max(...chartData, 1000); // Assurez un minimum de 1000ml pour l'échelle

    return {
      labels: last7Days,
      data: chartData,
      max: max,
    };
  };

  const getLast7Days = () => {
    let days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(moment().subtract(i, "days").format("DD/MM"));
    }
    return days;
  };

  return (
    <View>
      <Text style={styles.chartTitle}>
        Quantité d'eau bue durant la semaine
      </Text>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisSuffix="ml"
        yAxisInterval={1}
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
        fromZero={true}
        withInnerLines={true}
        segments={5}
        yLabelsOffset={0}
        yAxisMax={maxValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
    textAlign: "center",
  },
});
