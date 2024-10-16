import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function WeeklySleepChart() {
  const [sleepDuration, setSleepDuration] = useState(0); // This is the duration to be stored
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    const loadSleepDuration = async () => {
      try {
        const value = await AsyncStorage.getItem('sleepDuration');
        if (value !== null) {
          setSleepDuration(parseInt(value)); // Set stored sleep duration
        }
      } catch (error) {
        console.error('Failed to load sleep duration:', error);
      }
    };

    loadSleepDuration(); // Load sleep duration when component mounts
  }, []);

  useEffect(() => {
    const { labels, data, max } = processDataForChart();
    setChartData({
      labels: labels,
      datasets: [{ data: data }],
    });
    setMaxValue(max);
  }, [sleepDuration]); // Update when sleepDuration changes

  const processDataForChart = () => {
    const last7Days = getLast7Days();
    const chartData = last7Days.map((date) => {
      const formattedDate = moment(date, "DD/MM").format("YYYY-MM-DD");
      return formattedDate === moment().format("YYYY-MM-DD") ? sleepDuration : 0; // Use the current sleep duration
    });

    const max = Math.max(...chartData, 10); // Minimum scale value

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

  const handleSaveSleepDuration = async () => {
    try {
      // Save sleep duration in AsyncStorage
      await AsyncStorage.setItem('sleepDuration', sleepDuration.toString());
      Alert.alert('Success', 'Sleep duration saved!');
    } catch (error) {
      console.error('Failed to save sleep duration:', error);
    }
  };

  return (
    <View>
      <Text style={styles.chartTitle}>Hours of Sleep in the Past Week</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisSuffix=" hrs"
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
      <Button title="Save Sleep Duration" onPress={handleSaveSleepDuration} />
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
