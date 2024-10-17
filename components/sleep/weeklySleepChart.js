import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'; // Import TextInput here
import { BarChart } from 'react-native-chart-kit';

export default function WeeklySleepChart() {
  const [sleepTime, setSleepTime] = useState(''); // Store sleep time as a string
  const [wakeUpTime, setWakeUpTime] = useState(''); // Store wake-up time as a string
  const [sleepDuration, setSleepDuration] = useState(0); // Duration in minutes
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [maxValue, setMaxValue] = useState(0);

  // Load previous sleep data from AsyncStorage
  useEffect(() => {
    const loadSleepData = async () => {
      try {
        const sleepTimeValue = await AsyncStorage.getItem('sleepTime');
        const wakeUpTimeValue = await AsyncStorage.getItem('wakeUpTime');

        if (sleepTimeValue && wakeUpTimeValue) {
          setSleepTime(sleepTimeValue);
          setWakeUpTime(wakeUpTimeValue);
          calculateSleepDuration(sleepTimeValue, wakeUpTimeValue);
        }
      } catch (error) {
        console.error('Failed to load sleep data:', error);
      }
    };
    loadSleepData();
  }, []);

  // Calculate sleep duration whenever sleep or wake-up time changes
  useEffect(() => {
    calculateSleepDuration(sleepTime, wakeUpTime);
  }, [sleepTime, wakeUpTime]);

  // Function to calculate sleep duration
  const calculateSleepDuration = (sleepTime, wakeUpTime) => {
    if (sleepTime && wakeUpTime) {
      const sleepMoment = moment(sleepTime, 'HH:mm');
      const wakeUpMoment = moment(wakeUpTime, 'HH:mm');
      const duration = moment.duration(wakeUpMoment.diff(sleepMoment)).asMinutes();
      
      setSleepDuration(duration > 0 ? duration : 0); // Ensure duration is non-negative
    }
  };

  // Update chart data when sleepDuration changes
  useEffect(() => {
    const { labels, data, max } = processDataForChart();
    setChartData({
      labels: labels,
      datasets: [{ data: data }],
    });
    setMaxValue(max);
  }, [sleepDuration]);

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

  // Save sleep data to AsyncStorage
  const handleSaveSleepData = async () => {
    try {
      await AsyncStorage.setItem('sleepTime', sleepTime);
      await AsyncStorage.setItem('wakeUpTime', wakeUpTime);
      Alert.alert('Success', 'Sleep data saved!');
    } catch (error) {
      console.error('Failed to save sleep data:', error);
    }
  };

  return (
    <View>
      <Text style={styles.chartTitle}>Hours of Sleep in the Past Week</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisSuffix=" mins"
        yAxisInterval={60} // Change to 60 to represent hours more clearly
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    margin: 10,
  },
});

console.log("WeeklySleepChart Loaded");
