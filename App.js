import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { initDB } from "./DB/db"; // Make sure this path is correct
import BottomBar from "./components/BottomBar"; // Adjust path if needed

const App = () => {
  useEffect(() => {
    const setupDatabase = async () => {
      await initDB();
    };
    setupDatabase();
  }, []);

  return <BottomBar />;
};

export default App;
