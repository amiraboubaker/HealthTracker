import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is imported correctly
import { auth, db } from "../config/firebaseConfig";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Basic validation checks
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
      }

      // Password validation
      if (password.length < 6) {
        Alert.alert("Error", "Password should be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }

      // Step 1: Create authentication user
      console.log("Creating authentication user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Authentication user created successfully:", user.uid);

      // Step 2: Prepare user data
      const userData = {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Step 3: Store in Firestore
      console.log("Storing user data in Firestore...");
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData, { merge: true });
      console.log("User data stored successfully in Firestore");

      // Step 4: Store login state and navigate
      await AsyncStorage.setItem("loggedIn", JSON.stringify("True"));
      console.log("Login state stored successfully");

      // Step 5: Navigate to main screen
      navigation.navigate("Main");
    } catch (error) {
      console.error("Sign up error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      let errorMessage = "An error occurred during sign up.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already registered. Please try signing in instead.";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is invalid.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Email/password accounts are not enabled. Please contact support.";
          break;
        case "auth/weak-password":
          errorMessage =
            "The password is too weak. Please choose a stronger password.";
          break;
        case "firestore/permission-denied":
          errorMessage =
            "Permission denied to write user data. Please check your Firestore rules.";
          break;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          editable={!isLoading}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          editable={!isLoading}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          editable={!isLoading}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInPrompt}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            disabled={isLoading}
          >
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
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 170,
    height: 170,
    backgroundColor: "#fff",
    borderRadius: 85,
    borderColor: "#ff6347",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#fff",
  },
  signInContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signInPrompt: {
    color: "#fff",
  },
  link: {
    color: "#ff6347",
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "30%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default SignUpScreen;
