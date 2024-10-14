import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Circle,
  ClipPath,
} from "react-native-svg";

export default function WaterCircle({ currentWater, totalWater }) {
  const waterPercentage = (currentWater / totalWater) * 100;

  return (
    <View style={styles.circleContainer}>
      <Svg height="200" width="200" viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#00bfff" stopOpacity="1" />
            <Stop offset="100%" stopColor="#00bfff" stopOpacity="0.5" />
          </LinearGradient>
          <ClipPath id="clipCircle">
            <Circle cx="100" cy="100" r="95" />
          </ClipPath>
        </Defs>
        <Circle
          cx="100"
          cy="100"
          r="95"
          stroke="#000"
          strokeWidth="3"
          fill="#e0e0e0"
        />
        <Path
          clipPath="url(#clipCircle)"
          d={`M 0,${200 - waterPercentage * 2}
            C 50,${190 - waterPercentage * 2}, 150,${
            210 - waterPercentage * 2
          }, 200,${200 - waterPercentage * 2}
            L 200,200 L 0,200 Z`}
          fill="url(#grad)"
        />
      </Svg>
      <Text style={styles.waterText}>
        {currentWater}cl / {totalWater}cl ({Math.round(waterPercentage)}%)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  waterText: {
    marginVertical: 10,
    fontSize: 18,
  },
});
