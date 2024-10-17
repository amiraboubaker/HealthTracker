import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function WeeklySleepChart({ sleepData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [maxValue, setMaxValue] = useState(0);

  // Load previous sleep data from AsyncStorage
  useEffect(() => {
    if (sleepData) {
      updateChartData(sleepData);
    }
  }, [sleepData]);

  const updateChartData = (sleepHistory) => {
    const last7Days = getLast7Days();
    const chartData = last7Days.map((date) => {
      const sleepDuration = sleepHistory[date]?.hours || 0;
      return sleepDuration; // Return total hours
    });

    const max = Math.max(...chartData, 0); // Minimum scale value

    setChartData({
      labels: last7Days.map(date => moment(date, 'YYYY-MM-DD').format('DD/MM')), // Format as day/month
      datasets: [{ data: chartData }],
    });
    setMaxValue(max);
  };

  const getLast7Days = () => {
    let days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
    }
    return days;
  };

  const formatYAxisLabel = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value % 1) * 60);
    return `${hours} hr ${minutes} mn`; // Format as "X hr X mn"
  };

  return (
    <View>
      <Text style={styles.chartTitle}>Hours of Sleep in the Past Week</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 30}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yLabelsInterval={1}
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 0, // No decimal places for minutes
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 10,
          },
        }}
        verticalLabelRotation={30}
        fromZero={true}
        withInnerLines={true}
        segments={5}
        yLabelsOffset={0}
        yAxisMax={maxValue}
        onDataPointClick={(data) => {
          const { value } = data;
          const hours = Math.floor(value);
          const minutes = Math.round((value % 1) * 60);
          alert(`You slept for ${hours} hours and ${minutes} minutes on ${data.x}`); // Show alert on click
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
  },
});

console.log("WeeklySleepChart Loaded");
