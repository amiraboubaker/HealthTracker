import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    await AsyncStorage.setItem('user', JSON.stringify(userData));
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('SignIn');
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInPrompt}>You already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.link}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 170,
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 85,
    borderColor: '#ff6347', // Orange border color
    borderWidth: 5, // Border width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  signInContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInPrompt: {
    color: '#fff', 
  },
  link: {
    color: '#ff6347',
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
