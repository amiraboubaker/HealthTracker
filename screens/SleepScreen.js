import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import SleepChart from '../components/SleepChart';
import SleepTimeCard from '../components/SleepTimeCard';
import UserInfo from '../components/UserInfo';

const SleepScreen = () => {
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [sleepData, setSleepData] = useState([6, 7, 5, 8, 6, 7, 9]); // Default data
  const username = "Your Username";

  const [bedtimeSound, setBedtimeSound] = useState();
  const [wakeSound, setWakeSound] = useState();

  useEffect(() => {
    loadSavedTimes();
    loadSleepData();
    requestPermissions();
    loadSounds();
  }, []);

  // Load sleep time and wake time from AsyncStorage
  const loadSavedTimes = async () => {
    try {
      const savedSleepTime = await AsyncStorage.getItem('sleepTime');
      const savedWakeTime = await AsyncStorage.getItem('wakeTime');
      if (savedSleepTime) setSleepTime(new Date(savedSleepTime));
      if (savedWakeTime) setWakeTime(new Date(savedWakeTime));
    } catch (error) {
      console.error("Error loading saved times: ", error);
    }
  };

  // Load sleep data from AsyncStorage for last 7 days
  const loadSleepData = async () => {
    try {
      const storedSleepData = await AsyncStorage.getItem('sleepData');
      if (storedSleepData) {
        setSleepData(JSON.parse(storedSleepData));
      }
    } catch (error) {
      console.error('Error loading sleep data: ', error);
    }
  };

  const requestPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        alert('Notification permissions not granted!');
      }
    }
  };

  const loadSounds = async () => {
    const { sound: bedtimeSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/BedTime.mp3')
    );
    const { sound: wakeSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/WakeUp.mp3')
    );
    setBedtimeSound(bedtimeSound);
    setWakeSound(wakeSound);
  };

  // Save sleep and wake times, calculate sleep duration
  const saveSleepTime = async () => {
    try {
      await AsyncStorage.setItem('sleepTime', sleepTime.toISOString());
      await AsyncStorage.setItem('wakeTime', wakeTime.toISOString());

      const hoursSlept = calculateSleepDuration(sleepTime, wakeTime);
      await updateSleepData(hoursSlept);

      Toast.show({
        type: 'success',
        text1: 'Saved successfully',
      });

      scheduleAlerts();
    } catch (error) {
      console.error("Error saving sleep and wake times: ", error);
    }
  };

  // Calculate hours of sleep between sleepTime and wakeTime
  const calculateSleepDuration = (sleep, wake) => {
    const sleepDate = new Date(sleep);
    const wakeDate = new Date(wake);

    let diff = (wakeDate - sleepDate) / (1000 * 60 * 60); // Convert milliseconds to hours
    if (diff < 0) diff += 24; // Adjust if sleep and wake times cross midnight
    return diff.toFixed(1); // Return as a rounded number
  };

  // Update sleep data with new entry for today
  const updateSleepData = async (hoursSlept) => {
    try {
      const currentDate = new Date().getDay(); // Get the current day (0-6)
      const storedData = await AsyncStorage.getItem('sleepData');
      let updatedData = storedData ? JSON.parse(storedData) : [];

      // Replace data for current day or append if data for fewer than 7 days
      updatedData[currentDate] = parseFloat(hoursSlept);
      if (updatedData.length > 7) {
        updatedData = updatedData.slice(-7); // Keep only the last 7 days
      }

      await AsyncStorage.setItem('sleepData', JSON.stringify(updatedData));
      setSleepData(updatedData);
    } catch (error) {
      console.error('Error updating sleep data: ', error);
    }
  };

  const scheduleAlerts = async () => {
    const currentDate = new Date();
    const sleepAlertTime = new Date(sleepTime);
    const wakeAlertTime = new Date(wakeTime);

    const timeToBed = sleepAlertTime - currentDate;
    if (timeToBed > 0) {
      setTimeout(async () => {
        await bedtimeSound.playAsync();
        Alert.alert("Time to Go to Bed", "It's time to get ready for bed!");
      }, timeToBed);
    }

    const timeToWake = wakeAlertTime - currentDate;
    if (timeToWake > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time to wake up!',
          body: "It's time to get up!",
          sound: 'default',
        },
        trigger: {
          seconds: Math.floor(timeToWake / 1000),
        },
      });

      setTimeout(async () => {
        await wakeSound.playAsync();
        Alert.alert("Wake Up Alert", "It's time to wake up!", [
          { text: "OK", onPress: stopWakeSound },
        ]);
      }, timeToWake);
    }
  };

  const stopWakeSound = async () => {
    await wakeSound.stopAsync();
  };

  return (
    <View style={styles.container}>
      <UserInfo username={username} />
      <SleepTimeCard
        sleepTime={sleepTime}
        setSleepTime={setSleepTime}
        wakeTime={wakeTime}
        setWakeTime={setWakeTime}
        onSave={saveSleepTime}
      />
      <SleepChart sleepData={sleepData} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default SleepScreen;
