import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const FoodTracker = () => {
  const [scannedData, setScannedData] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (scannedData) {
      fetchFoodData(scannedData);
    }
  }, [scannedData]);

  const handleBarCodeScanned = (data) => {
    setScannedData(data);
  };

  const fetchFoodData = async (barcode) => {
    try {
      const apiKey = '949c97c36081a6b1558419808fd5ccf5';
      const apiUrl = `https://api.nutritionix.com/v1_1/item?upc=${barcode}&appId=56cc565f&appKey=${apiKey}`;

      const response = await axios.get(apiUrl);
      setFoodData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const resetData = () => {
    setScannedData(null);
    setFoodData(null);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {foodData ? (
              <View style={styles.foodInfo}>
                <Text>Total calories: {foodData.nf_calories || 0}</Text>
                <Text>Total fat: {foodData.nf_total_fat || 0} g</Text>
                <Text>Total protein: {foodData.nf_protein || 0} g</Text>
                <Text>Total carbs: {foodData.nf_total_carbohydrate || 0} g</Text>
              </View>
            ) : (
              <Text>No food data found.</Text>
            )}
          </>
        )}
      </View>

      {!scannedData ? (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleBarCodeScanned}
        />
      ) : (
        <Button title="Scan Again" onPress={resetData} />
      )}

      <Button title="Reset Data" onPress={resetData} />
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