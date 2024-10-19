import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig'; // Import Firebase auth configuration

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      // Attempt to sign in the user with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // Navigate to Home on successful sign-in
      navigation.navigate('Home');
    } catch (error) {
      // Display an error message in case of invalid credentials or other errors
      Alert.alert('Error', 'Invalid credentials or an issue occurred.');
    }
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
        <Text style={styles.title}>Sign In</Text>
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
        
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.signInPrompt}>
          Don't have an account? <Text onPress={() => navigation.navigate('SignUp')} style={styles.link}>Sign Up</Text>
        </Text>
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
    borderColor: '#ff6347', 
    borderWidth: 5, 
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
    color: '#fff' 
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5, 
    width: '100%', 
    backgroundColor: '#fff' 
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

export default SignInScreen;
