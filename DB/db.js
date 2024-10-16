const handleAddSleep = async () => {
    const sleepHours = (wakeUpTime - sleepTime) / 1000 / 60 / 60; // Calculate hours
    const today = moment().format("YYYY-MM-DD"); // Get current date in YYYY-MM-DD format

    const sleepData = {
        hours: sleepHours > 0 ? sleepHours : 0, // Ensure non-negative sleep hours
        date: today,
    };

    // Save to AsyncStorage
    try {
        const storedData = await AsyncStorage.getItem("sleepData");
        let sleepHistory = storedData ? JSON.parse(storedData) : {};
        
        // Update the sleep data for the current date
        sleepHistory[today] = {
            ...sleepHistory[today],
            hours: (sleepHistory[today]?.hours || 0) + sleepData.hours, // Accumulate hours if the date exists
        };

        await AsyncStorage.setItem("sleepData", JSON.stringify(sleepHistory));
        
        // Trigger the state update
        onAddSleep(sleepHistory);

        Alert.alert(
            "Sleep Duration",
            `You will spend approximately ${sleepHours.toFixed(2)} hours sleeping.`,
            [{ text: "OK" }]
        );

        // Clear inputs after alert
        setSleepTime(new Date());
        setWakeUpTime(new Date());
    } catch (error) {
        console.error("Failed to save sleep data", error);
    }
};
