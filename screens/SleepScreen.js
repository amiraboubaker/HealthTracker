import { Audio } from 'expo-av'; // Import Audio from expo-av
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
  const [sleepData, setSleepData] = useState([6, 7, 5, 8, 6, 7, 9]);
  const username = "Your Username";

  // Audio state
  const [bedtimeSound, setBedtimeSound] = useState();
  const [wakeSound, setWakeSound] = useState();

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Notification permissions not granted!');
        }
      }
    };

    requestPermissions();

    // Load sound assets
    loadSounds();

    // Listen for notification responses
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { title, body } = response.notification.request.content;
      Alert.alert(title, body); // Show alert when notification is tapped
    });

    return () => {
      subscription.remove(); // Cleanup subscription on unmount
    };
  }, []);

  // Load sounds for bedtime and wake-up alerts
  const loadSounds = async () => {
    const { sound: bedtimeSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/BedTime.mp3') // Adjust the path according to your project structure
    );
    const { sound: wakeSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/WakeUp.mp3') // Adjust the path according to your project structure
    );
    setBedtimeSound(bedtimeSound);
    setWakeSound(wakeSound);
  };

  const saveSleepTime = () => {
    // Set wake time to 10 seconds in the future for testing
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 10 * 1000);
    setWakeTime(futureDate);

    Toast.show({
      type: 'success',
      text1: 'Saved successfully',
    });

    scheduleAlerts();
  };

  const scheduleAlerts = async () => {
    const currentDate = new Date();
    const sleepAlertTime = new Date(sleepTime);
    const wakeAlertTime = new Date(wakeTime);

    // Schedule bedtime alert
    const timeToBed = sleepAlertTime - currentDate;
    if (timeToBed > 0) {
      setTimeout(async () => {
        await bedtimeSound.playAsync(); // Play bedtime sound
        Alert.alert("Time to Go to Bed", "It's time to get ready for bed!");
      }, timeToBed);
    }

    // Schedule wake-up alert
    const timeToWake = wakeAlertTime - currentDate;
    console.log(`Time to wake (ms): ${timeToWake}`); // Log the time to wake
    if (timeToWake > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time to wake up!',
          body: "It's time to get up!",
          sound: 'default',
        },
        trigger: {
          seconds: Math.floor(timeToWake / 1000), // Convert milliseconds to seconds
        },
      });

      // Alert the user when the time to wake arrives
      setTimeout(async () => {
        await playWakeSound(); // Play wake-up sound
        showWakeUpAlert(); // Show the wake-up alert
      }, timeToWake);
    }
  };

  // Function to play wake sound once
  const playWakeSound = async () => {
    await wakeSound.playAsync(); // Play the wake-up sound
  };

  // Show wake-up alert and stop the sound
  const showWakeUpAlert = () => {
    Alert.alert(
      "Wake Up Alert",
      "It's time to wake up!",
      [
        {
          text: "OK",
          onPress: stopWakeSound, // Stop the wake sound when OK is pressed
        },
      ],
      { cancelable: false }
    );
  };

  // Function to stop the wake sound
  const stopWakeSound = async () => {
    await wakeSound.stopAsync(); // Stop the wake sound
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
