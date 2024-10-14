import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TimePicker = ({ label, time, setTime }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    // Check if the event is of type 'set' and selectedTime is valid
    if (event.type === 'set' && selectedTime) {
      setTime(selectedTime); // Update the time with the selected value
    }
    
    // Always close the picker after selection
    setShowPicker(false);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.timeText} onPress={() => setShowPicker(true)}>
        {time.getHours().toString().padStart(2, '0')}:
        {time.getMinutes().toString().padStart(2, '0')}
      </Text>
      {showPicker && (
        <DateTimePicker
          value={time} // Make sure this is a valid Date object
          mode="time"
          display="default"
          onChange={handleTimeChange}
          onTouchCancel={() => setShowPicker(false)} // Close the picker on touch cancel
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  timeText: {
    fontSize: 18,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
});

export default TimePicker;
