import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Audio } from 'expo-av'; 
import SleepInput from "../components/sleep/sleepInput";
import WeeklySleepChart from "../components/sleep/weeklySleepChart";

export default function SleepScreen() {
  const [sleepData, setSleepData] = useState({});
  const [wakeUpTime, setWakeUpTime] = useState(null);
  const [sound, setSound] = useState();
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const playWakeUpSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/WakeUp.mp3')
      );
      setSound(sound);
      setIsSoundPlaying(true);
      await sound.playAsync();

      // Alert the user with an option to stop the sound
      Alert.alert(
        "Wake up!",
        "It's time to wake up.",
        [
          {
            text: "Stop Sound",
            onPress: async () => {
              await stopSound();
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync(); // Unload the sound from memory
      setSound(null);
      setIsSoundPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload sound when the component unmounts or sound changes
        }
      : undefined;
  }, [sound]);

  const addSleep = async (newSleepData) => {
    setSleepData(newSleepData);
    await AsyncStorage.setItem("sleepData", JSON.stringify(newSleepData));
    
    // Update wakeUpTime with the new data
    if (newSleepData[Object.keys(newSleepData)[0]].wakeUpTime) {
      const newWakeUpTime = new Date(newSleepData[Object.keys(newSleepData)[0]].wakeUpTime);
      setWakeUpTime(newWakeUpTime);
      console.log("New Wake Up Time Set:", newWakeUpTime); // Debugging log
    }
  };

  const loadSleepData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("sleepData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setSleepData(parsedData);
        if (parsedData[Object.keys(parsedData)[0]].wakeUpTime) {
          const storedWakeUpTime = new Date(parsedData[Object.keys(parsedData)[0]].wakeUpTime);
          setWakeUpTime(storedWakeUpTime);
          console.log("Loaded Wake Up Time:", storedWakeUpTime); // Debugging log
        }
      }
    } catch (error) {
      console.error("Failed to load sleep data", error);
    }
  };

  useEffect(() => {
    loadSleepData();
  }, []);

  useEffect(() => {
    // Only set a timeout if wakeUpTime is set and in the future
    if (wakeUpTime && !isSoundPlaying) {
      const currentTime = new Date();
      const timeDiff = wakeUpTime.getTime() - currentTime.getTime();

      if (timeDiff > 0) {
        const timeoutId = setTimeout(() => {
          console.log("Triggering Wake Up Sound"); // Debugging log
          playWakeUpSound();
        }, timeDiff);

        return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount or when dependencies change
      }
    }
  }, [wakeUpTime, isSoundPlaying]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Tracker</Text>
      <SleepInput onAddSleep={addSleep} />
      <WeeklySleepChart sleepData={sleepData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
