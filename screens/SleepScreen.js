import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SleepInput from "../components/sleep/sleepInput"; // Correct import path
import WeeklySleepChart from "../components/sleep/WeeklySleepChart"; // Correct import path

export default function SleepScreen() {
    const [sleepData, setSleepData] = useState({});

    const addSleep = async (newSleepData) => {
        setSleepData(newSleepData);
    };

    const loadSleepData = async () => {
        try {
            const storedData = await AsyncStorage.getItem("sleepData");
            if (storedData) {
                setSleepData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error("Failed to load sleep data", error);
        }
    };

    useEffect(() => {
        loadSleepData(); // Load data on component mount
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sleep Tracker</Text>
            <SleepInput onAddSleep={addSleep} />
            <WeeklySleepChart sleepData={sleepData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
