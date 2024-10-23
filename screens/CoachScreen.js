import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CoachScreen = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      text: "Hi, I'm your personal coach, what can I do for you?",
    },
  ]);

  const chatbotResponse = (message) => {
    const msgLower = message.toLowerCase();
    if (msgLower.includes("workout")) {
      return (
        <Text>
          'For a good workout, focus on strength training and cardio. Mix them
          for the best results!';
        </Text>
      );
    } else if (msgLower.includes("diet")) {
      return (
        <Text>
          'A balanced diet is key. Include lean protein, vegetables, healthy
          fats, and complex carbs.';
        </Text>
      );
    } else if (msgLower.includes("recovery")) {
      return (
        <Text>
          'Recovery is just as important as working out. Get enough sleep and
          stay hydrated.';
        </Text>
      );
    } else if (msgLower.includes("cardio")) {
      return (
        <Text>
          'Cardio exercises like running, cycling, and swimming improve heart
          health.';
        </Text>
      );
    } else if (msgLower.includes("water")) {
      return (
        <Text>
          "It's important to drink at least 8 glasses of water a day to stay
          hydrated, especially during exercise."
        </Text>
      );
    } else if (msgLower.includes("sleep")) {
      return (
        <Text>
          'Aim for 7-9 hours of sleep per night to help your muscles recover and
          improve overall well-being.';
        </Text>
      );
    } else {
      return (
        <Text>
          'I’m here to help! You can ask about workouts, diet, water intake,
          sleep, or recovery.'
        </Text>
      );
    }
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newChat = [
        ...chatHistory,
        { type: "user", text: userMessage },
        { type: "bot", text: chatbotResponse(userMessage) },
      ];
      setChatHistory(newChat);
      setUserMessage("");
    } else {
      alert("Please enter a message.");
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.type === "user" ? styles.userMessage : styles.botMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coach Bot</Text>
      </View>
      <FlatList
        data={chatHistory}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatWindow}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask your fitness question..."
          value={userMessage}
          onChangeText={setUserMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  chatWindow: {
    flex: 1,
    marginBottom: 10,
    // backgroundColor: "#aaa",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    maxWidth: "80%",
    marginBottom: 50,
  },
  messageText: {
    color: "#000",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default CoachScreen;