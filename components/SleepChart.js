import React from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const SleepChart = ({ sleepData }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'center' }}>
        Sleeping Hours (Last 7 Days)
      </Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: sleepData }],
        }}
        width={screenWidth - 20}
        height={220}
        yAxisSuffix="h"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        style={{ marginVertical: 0, borderRadius: 16 }}
      />
    </View>
  );
};

export default SleepChart;
