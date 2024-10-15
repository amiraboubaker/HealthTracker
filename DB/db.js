import AsyncStorage from "@react-native-async-storage/async-storage";

const initDB = async () => {
  try {
    // Initialize user data if not exists
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ id: 1, name: "Default User", water_goal: 2000 })
      );
    }

    // Initialize water data if not exists
    const waterData = await AsyncStorage.getItem("water_data");
    if (!waterData) {
      await AsyncStorage.setItem("water_data", JSON.stringify([]));
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

const getWaterData = async () => {
  try {
    const waterData = await AsyncStorage.getItem("water_data");
    return waterData ? JSON.parse(waterData) : [];
  } catch (error) {
    console.error("Error getting water data:", error);
    return [];
  }
};

const addWaterData = async (newData) => {
  try {
    const currentData = await getWaterData();
    currentData.push(newData);
    await AsyncStorage.setItem("water_data", JSON.stringify(currentData));
  } catch (error) {
    console.error("Error adding water data:", error);
  }
};

export { initDB, getUser, getWaterData, addWaterData };
