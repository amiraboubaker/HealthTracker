import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function WeeklySleepChart({ sleepData }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [maxValue, setMaxValue] = useState(10); // Set a maximum value for scaling

  // Load previous sleep data from AsyncStorage
  useEffect(() => {
    if (sleepData) {
      updateChartData(sleepData);
    }
  }, [sleepData]);

  const updateChartData = (sleepHistory) => {
    const last7Days = getLast7Days();
    const chartData = last7Days.map((date) => {
      const sleepEntry = sleepHistory[date] || {};

      // Initialize sleep duration for the day
      let sleepDuration = 0;

      // If the date is today, calculate sleep duration if data exists
      if (moment().isSame(date, 'day')) {
        if (sleepEntry.sleepTime && sleepEntry.wakeUpTime) {
          const sleepTime = moment(sleepEntry.sleepTime);
          const wakeUpTime = moment(sleepEntry.wakeUpTime);
          sleepDuration = Math.abs(wakeUpTime.diff(sleepTime, 'minutes')); // Ensure positive duration
        }
        return sleepDuration / 60; // Convert minutes to hours for chart
      }

      // If sleep data exists for past days, calculate sleep duration
      if (sleepEntry.sleepTime && sleepEntry.wakeUpTime) {
        const sleepTime = moment(sleepEntry.sleepTime);
        const wakeUpTime = moment(sleepEntry.wakeUpTime);
        sleepDuration = Math.abs(wakeUpTime.diff(sleepTime, 'minutes')); // Ensure positive duration
        return sleepDuration / 60; // Convert minutes to hours for chart
      } else {
        // Generate random values for past days if there's no data
        const randomSleepHours = Math.floor(Math.random() * 9); // Random hours between 0 and 8
        const randomSleepMinutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
        const sleepTime = moment().subtract(7 - last7Days.indexOf(date), 'days').set({ hour: randomSleepHours, minute: randomSleepMinutes });
        const wakeUpTime = sleepTime.clone().add(randomSleepHours, 'hours').add(randomSleepMinutes, 'minutes');

        sleepEntry.sleepTime = sleepTime.toISOString();
        sleepEntry.wakeUpTime = wakeUpTime.toISOString();

        // Calculate sleep duration for the generated data
        sleepDuration = Math.abs(moment(wakeUpTime).diff(sleepTime, 'minutes')); // Ensure positive duration

        return sleepDuration / 60; // Convert minutes to hours for chart
      }
    });

    const max = Math.max(...chartData, 0); // Minimum scale value
    setMaxValue(Math.max(max, 8)); // Ensure maxValue is at least 8

    setChartData({
      labels: last7Days.map(date => moment(date, 'YYYY-MM-DD').format('DD/MM')), // Format as day/month
      datasets: [{ data: chartData }],
    });
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
    return `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m`; // Format as "h m"
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
          decimalPlaces: 2, // Allow for decimal places to represent fractions of an hour
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 10,
          },
          formatYLabel: (value) => formatYAxisLabel(value), // Use formatYAxisLabel here
        }}
        verticalLabelRotation={30}
        fromZero={true}
        withInnerLines={true}
        segments={5}
        yLabelsOffset={0}
        yAxisMax={maxValue}
        yAxisInterval={1} // Ensure there are segments for each hour
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
