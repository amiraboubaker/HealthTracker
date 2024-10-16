import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const GetStartedScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Gradient colors
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appName}>HealthTrackApp</Text>
        <Text style={styles.description}>Track your health by monitoring water intake, sleep, and diet.</Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Hide the header for this screen
GetStartedScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 3,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 50,
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default GetStartedScreen;
