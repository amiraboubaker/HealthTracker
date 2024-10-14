import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import TimePicker from './TimePicker';

const SleepTimeCard = ({
  sleepTime,
  setSleepTime,
  wakeTime,
  setWakeTime,
  onSave
}) => {
  
  // New function to handle saving and setting the alarm
  const handleSave = () => {
    // Assuming onSave saves the times
    onSave();
    
    // Schedule the alarm
    scheduleAlarm(wakeTime);

    // Show success alert
    Alert.alert("Time updated successfully", "Wake up time has been updated!");
  };

  // Function to schedule the alarm
  const scheduleAlarm = (wakeTime) => {
    const alarmTime = new Date(wakeTime);
    alarmTime.setSeconds(0); 

    PushNotification.localNotificationSchedule({
      id: 'wakeUpAlarm',
      message: 'Time to wake up!',
      date: alarmTime,
      sound: 'default',
      playSound: true,
      vibrate: true,
    });
  };

  return (
    <View style={styles.card}>
      <TimePicker 
        label="Sleep Time" 
        time={sleepTime} 
        setTime={setSleepTime}
      />
      
      <TimePicker 
        label="Wake Up Time" 
        time={wakeTime} 
        setTime={setWakeTime}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    marginBottom: 50,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SleepTimeCard;
