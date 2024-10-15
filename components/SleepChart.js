import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SleepChart = () => {
  const [sleepData, setSleepData] = useState([]);
  const [labels, setLabels] = useState([]);

  // Function to fetch sleep data
  const fetchSleepData = async () => {
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString('default', { month: 'long' });

    const yearData = JSON.parse(await AsyncStorage.getItem(year.toString())) || {};
    const monthData = yearData[month] || {};

    // Days of the week mapping
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeklySleep = Array(7).fill(0); // Assuming 7 days in a week
    const dailyLabels = daysOfWeek; // Days of the week

    // Collect sleep data for the current month
    for (const week in monthData) {
      for (const day in monthData[week]) {
        const sleepDuration = monthData[week][day]?.sleepDuration || 0;
        const dayOfWeekIndex = new Date(monthData[week][day]?.date).getDay(); // Get the day of the week
        weeklySleep[dayOfWeekIndex] += sleepDuration; // Sum the sleep duration for the day
      }
    }

    setSleepData(weeklySleep);
    setLabels(dailyLabels);
  };

  useEffect(() => {
    fetchSleepData();
  }, []);

  // Chart configuration
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 120, 255, ${opacity})`, // Line color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#00aced', // Dot color
    },
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        Sleep Duration for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Text>
      <LineChart
        data={{
          labels: labels.length > 0 ? labels : ['Loading...'],
          datasets: [
            {
              data: sleepData.length > 0 ? sleepData : [0],
              color: (opacity = 1) => `rgba(0, 120, 255, ${opacity})`, // Custom color for the line
              strokeWidth: 3, // Width of the line
            },
          ],
        }}
        width={Dimensions.get('window').width - 30} // from react-native
        height={220}
        chartConfig={chartConfig}
        bezier // Add bezier curves to the line
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default SleepChart;
