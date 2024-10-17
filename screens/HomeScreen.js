import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(JSON.parse(storedUser));
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/user.png')} style={styles.icon} />
        <Text style={styles.username}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text>Water</Text>
          {/* Water consumption logic here */}
        </View>
        <View style={styles.card}>
          <Text>Sleep</Text>
          {/* Sleep hours logic here */}
        </View>
        <View style={styles.foodCard}>
          <Text>Food</Text>
          <Text>Category: { /* Food consumption percentage */ }%</Text>
          <Text>Fat: { /* Fat percentage */ }%</Text>
          <Text>Protein: { /* Protein percentage */ }%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  icon: { width: 50, height: 50, marginRight: 10 },
  username: { fontSize: 18 },
  cardsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { width: '45%', padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 },
  foodCard: { width: '45%', padding: 20, backgroundColor: '#ffefef', borderRadius: 10 },
});

export default HomeScreen;

