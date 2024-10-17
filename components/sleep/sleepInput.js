import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SleepInput = ({ onAddSleep }) => {
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeUpTime, setWakeUpTime] = useState(new Date());
  const [showSleepPicker, setShowSleepPicker] = useState(false);
  const [showWakePicker, setShowWakePicker] = useState(false);

  const handleAddSleep = async () => {
    const sleepDuration = wakeUpTime - sleepTime; // Duration in milliseconds
    const sleepHours = Math.floor(sleepDuration / 1000 / 60 / 60);
    const sleepMinutes = Math.floor((sleepDuration / 1000 / 60) % 60);
    const today = moment().format("YYYY-MM-DD");

    const sleepData = {
      hours: sleepHours + sleepMinutes / 60, // Save total hours (including minutes as a fraction)
      date: today,
    };

    // Save to AsyncStorage
    try {
      const storedData = await AsyncStorage.getItem("sleepData");
      let sleepHistory = storedData ? JSON.parse(storedData) : {};

      // Update the sleep data for the current date
      sleepHistory[today] = {
        ...sleepHistory[today],
        hours: (sleepHistory[today]?.hours || 0) + sleepData.hours,
      };

      await AsyncStorage.setItem("sleepData", JSON.stringify(sleepHistory));

      // Trigger the state update
      onAddSleep(sleepHistory);

      Alert.alert(
        "Sleep Duration",
        `You will spend approximately ${sleepHours} hours and ${sleepMinutes} minutes sleeping.`,
        [{ text: "OK" }]
      );

      // Clear inputs after alert
      setSleepTime(new Date());
      setWakeUpTime(new Date());
    } catch (error) {
      console.error("Failed to save sleep data", error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Sleep Time:</Text>
        <TouchableOpacity onPress={() => setShowSleepPicker(true)} style={styles.timePicker}>
          <Text style={styles.timeText}>{sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showSleepPicker && (
          <DateTimePicker
            value={sleepTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowSleepPicker(false);
              if (selectedDate) {
                setSleepTime(selectedDate);
              }
            }}
          />
        )}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Wake Up Time:</Text>
        <TouchableOpacity onPress={() => setShowWakePicker(true)} style={styles.timePicker}>
          <Text style={styles.timeText}>{wakeUpTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showWakePicker && (
          <DateTimePicker
            value={wakeUpTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowWakePicker(false);
              if (selectedDate) {
                setWakeUpTime(selectedDate);
              }
            }}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddSleep}>
        <Text style={styles.buttonText}>Add Sleep</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  timePicker: {
    backgroundColor: "#f0f8ff",
    borderRadius: 5,
    padding: 10,
    flex: 2,
    marginLeft: 10,
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00bfff",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SleepInput;
