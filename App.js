import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WaterComponent from "./components/water/WaterComponent";

export default function App() {
  return <WaterComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
