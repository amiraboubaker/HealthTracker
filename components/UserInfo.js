// UserInfo.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // for the username icon

const UserInfo = ({ username }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <FontAwesome name="user-circle" size={30} color="black" />
      <Text style={styles.username}>{username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  username: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default UserInfo;
