import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import UserInfo from '../components/UserInfo';
import SleepTimeCard from '../components/SleepTimeCard';
import SleepChart from '../components/SleepChart';
import Toast from 'react-native-toast-message';
import { Audio } from 'expo-av';

const SleepScreen = () => {
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [sleepData, setSleepData] = useState([6, 7, 5, 8, 6, 7, 9]);
  const [showSleepPicker, setShowSleepPicker] = useState(false);
  const [showWakePicker, setShowWakePicker] = useState(false);
  const username = "Your Username";

  // Sound variables
  const [bedtimeSound, setBedtimeSound] = useState();
  const [wakeupSound, setWakeupSound] = useState();

  const saveSleepTime = () => {
    Toast.show({
      type: 'success',
      text1: 'Saved successfully',
    });
    
    scheduleAlerts();
  };

  const scheduleAlerts = () => {
    const currentDate = new Date();
    const sleepAlertTime = new Date(sleepTime);
    const wakeAlertTime = new Date(wakeTime);

    const timeToBed = sleepAlertTime - currentDate;
    if (timeToBed > 0) {
      setTimeout(() => {
        playSound(bedtimeSound);
        Alert.alert("Time to Go to Bed", "It's time to get ready for bed!");
      }, timeToBed);
    }

    const timeToWake = wakeAlertTime - currentDate;
    if (timeToWake > 0) {
      setTimeout(() => {
        playSound(wakeupSound);
        Alert.alert("Time to Wake Up", "It's time to get up!");
      }, timeToWake);
    }
  };

  const playSound = async (sound) => {
    if (sound) {
      await sound.replayAsync(); // Play the sound again if already loaded
    }
  };

  // Load sounds
  const loadSounds = async () => {
    const { sound: bedtimeSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/BedTime.mp3')
    );
    setBedtimeSound(bedtimeSound);

    const { sound: wakeupSound } = await Audio.Sound.createAsync(
      require('../assets/sounds/WakeUp.mp3')
    );
    setWakeupSound(wakeupSound);
  };

  useEffect(() => {
    loadSounds();
    
    // Clean up the sounds when the component unmounts or the sounds change
    return () => {
      if (bedtimeSound) {
        bedtimeSound.unloadAsync();
      }
      if (wakeupSound) {
        wakeupSound.unloadAsync();
      }
    };
  }, [bedtimeSound, wakeupSound]); // Include the sound variables in the dependency array

  return (
    <View style={styles.container}>
      {/* Username Component */}
      <UserInfo username={username} />

      {/* Sleep Time Card */}
      <SleepTimeCard
        sleepTime={sleepTime}
        setSleepTime={setSleepTime}
        showSleepPicker={showSleepPicker}
        setShowSleepPicker={setShowSleepPicker}
        wakeTime={wakeTime}
        setWakeTime={setWakeTime}
        showWakePicker={showWakePicker}
        setShowWakePicker={setShowWakePicker}
        onSave={saveSleepTime}
      />

      {/* Chart */}
      <SleepChart sleepData={sleepData} />

      {/* Toast */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // justifyContent: 'space-between', 
  },
});

export default SleepScreen;