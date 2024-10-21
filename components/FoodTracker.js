import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const FoodTracker = () => {
  const [scanned, setScanned] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    if (currentDate !== lastUpdated) {
      resetDailyData();
    }
  }, [lastUpdated]);

  const resetDailyData = () => {
    setTotalCalories(0);
    setTotalFat(0);
    setTotalProtein(0);
    setTotalCarbs(0);
    setLastUpdated(new Date().toLocaleDateString());
    setError(null);
    console.log('Daily data reset');
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log('Scanned data:', data);
    fetchFoodData(data);
  };

  const fetchFoodData = async (barcode) => {
    const apiKey = '949c97c36081a6b1558419808fd5ccf5'; 
    const apiUrl = `https://api.nutritionix.com/v1_1/item?upc=${barcode}&appId=YOUR_APP_ID&appKey=${apiKey}`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      console.log('API response:', response.data);

      const data = response.data;

      const calories = data.nf_calories || 0;
      const fat = data.nf_total_fat || 0;
      const protein = data.nf_protein || 0;
      const carbs = data.nf_total_carbohydrate || 0;

      setTotalCalories((prevCalories) => prevCalories + calories);
      setTotalFat((prevFat) => prevFat + fat);
      setTotalProtein((prevProtein) => prevProtein + protein);
      setTotalCarbs((prevCarbs) => prevCarbs + carbs);

      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching food data:', err);
      setError('Failed to fetch food data. Please try again.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        {loading ? (
          <Text>Loading food data...</Text>
        ) : (
          <>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <View style={styles.foodInfo}>
                <Text>Total calories: {totalCalories || 0}</Text>
                <Text>Total fat: {totalFat || 0} g</Text>
                <Text>Total protein: {totalProtein || 0} g</Text>
                <Text>Total carbs: {totalCarbs || 0} g</Text>
              </View>
            )}
          </>
        )}
      </View>

      {!scanned ? (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeScanned}
        />
      ) : (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}

      <Button title="Reset Daily Data" onPress={resetDailyData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  resultContainer: {
    padding: 20,
  },
  foodInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FoodTracker;
