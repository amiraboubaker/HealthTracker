import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const sleepData = {
  "2024-10-20": {
    sleepTime: "2024-10-20T22:00:00Z", // Sleep time in ISO format
    wakeUpTime: "2024-10-21T06:00:00Z", // Wake-up time in ISO format
  },
  "2024-10-21": {
    sleepTime: "2024-10-21T23:00:00Z",
    wakeUpTime: "2024-10-22T07:30:00Z",
  },
  "2024-10-22": {
    sleepTime: "2024-10-22T00:15:00Z",
    wakeUpTime: "2024-10-22T08:45:00Z",
  },
};

// Function to fill in sleep data for previous dates
const fillPreviousDates = (sleepData) => {
  const currentDate = moment().startOf('day'); // Get the current date without time
  const filledData = { ...sleepData };

  // Loop through the last 7 days
  for (let i = 1; i <= 6; i++) {
    const pastDate = currentDate.subtract(1, 'days').format('YYYY-MM-DD');
    if (!filledData[pastDate]) {
      filledData[pastDate] = {
        sleepTime: moment(pastDate).set({ hour: 22, minute: 0 }).toISOString(), // Example sleep time
        wakeUpTime: moment(pastDate).set({ hour: 6, minute: 0 }).add(8, 'hours').toISOString(), // Example wake-up time (8 hours later)
      };
    }
  }
  return filledData;
};

// Function to calculate and save sleep durations
const saveSleepData = async () => {
  try {
    const completeSleepData = fillPreviousDates(sleepData); // Fill in previous dates
    const formattedData = Object.keys(completeSleepData).reduce((acc, date) => {
      const sleepEntry = completeSleepData[date];
      const sleepDurationMinutes = moment(sleepEntry.wakeUpTime).diff(moment(sleepEntry.sleepTime), 'minutes');
      const hours = Math.floor(sleepDurationMinutes / 60);
      const minutes = sleepDurationMinutes % 60;

      acc[date] = {
        hours,
        minutes,
        sleepTime: sleepEntry.sleepTime,
        wakeUpTime: sleepEntry.wakeUpTime,
      };
      return acc;
    }, {});

    await AsyncStorage.setItem('sleepData', JSON.stringify(formattedData));
    console.log('Sleep data saved successfully:', formattedData);
  } catch (error) {
    console.error('Failed to save sleep data:', error);
  }
};

// Invoke the save function
saveSleepData();
