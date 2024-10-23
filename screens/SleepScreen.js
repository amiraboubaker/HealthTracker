import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import SleepInput from "../components/sleep/sleepInput";
import WeeklySleepChart from "../components/sleep/weeklySleepChart";

export default function SleepScreen() {
  const [sleepData, setSleepData] = useState({});
  const [wakeUpTime, setWakeUpTime] = useState(null);
  const [sound, setSound] = useState();
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const playWakeUpSound = async () => {
    try {
      console.log("Attempting to play sound"); // Debug log
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/WakeUp.mp3")
      );
      setSound(sound);
      setIsSoundPlaying(true);
      await sound.playAsync();

      // Show alert after the sound starts playing
      Alert.alert(
        "Wake up!",
        "It's time to wake up.",
        [
          {
            text: "Stop Sound",
            onPress: async () => {
              await stopSound();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error playing sound:", error);
      Alert.alert("Error", "Failed to play the sound.");
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync(); // Unload the sound from memory
      setSound(null);
      setIsSoundPlaying(false); // Update sound playing state
      Alert.alert("Sound Stopped", "The wake-up sound has been stopped.");
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload sound when the component unmounts or sound changes
      }
    };
  }, [sound]);

  const addSleep = async (newSleepData) => {
    // Get the current date and time
    const currentDateTime = new Date();

    // Set the sleep time to the current date and time
    const sleepWithCurrentTime = {
      ...newSleepData,
      [Object.keys(newSleepData)[0]]: {
        ...newSleepData[Object.keys(newSleepData)[0]],
        sleepTime: currentDateTime.toISOString(), // Store as ISO string
      },
    };

    setSleepData(sleepWithCurrentTime);
    await AsyncStorage.setItem(
      "sleepData",
      JSON.stringify(sleepWithCurrentTime)
    );

    // Update wakeUpTime with the new data
    if (sleepWithCurrentTime[Object.keys(sleepWithCurrentTime)[0]].wakeUpTime) {
      const newWakeUpTime = new Date(
        sleepWithCurrentTime[Object.keys(sleepWithCurrentTime)[0]].wakeUpTime
      );
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
          const storedWakeUpTime = new Date(
            parsedData[Object.keys(parsedData)[0]].wakeUpTime
          );
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
    // Check if wakeUpTime is set and in the future
    if (wakeUpTime && !isSoundPlaying) {
      const currentTime = new Date();
      const timeDiff = wakeUpTime.getTime() - currentTime.getTime();

      console.log("Current Time:", currentTime); // Debugging log
      console.log("Wake Up Time:", wakeUpTime); // Debugging log
      console.log("Time Difference (ms):", timeDiff); // Debugging log

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
      {/* Add Image Component here */}
      <Image
        source={require("../assets/images/clock.png")} // Path to your clock image
        style={styles.clockImage} // Apply styles for the image
        resizeMode="contain" // Ensures the image fits well
      />
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  clockImage: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    marginBottom: 5, // Space below the image
    marginTop: -30,
  },
});
