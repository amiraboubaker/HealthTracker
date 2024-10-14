import React from "react";
import WaterComponent from "./components/water/WaterComponent";
import SleepScreen from "./screens/SleepScreen";
import BottomBar from "./components/BottomBar"; // Import the BottomBar

const App = () => {
  return (
    <>
      {/* <WaterComponent userWaterGoal={2500} /> */}

      <BottomBar />
    </>
  );
};

export default App;
