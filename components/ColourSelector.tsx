// ColorSelector.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const ColorSelector = ({ onColorChange }:any) => {
  const [color, setColor] = useState('#ffffff'); // Default color

  const handleColorChange = (selectedColor: any) => {
    setColor(selectedColor);
    if (onColorChange) {
      onColorChange(selectedColor);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.colorDisplay, { backgroundColor: color }]} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Select Color</Text>
      </TouchableOpacity>
      <ColorPicker
        color={color}
        onColorChange={handleColorChange}
        style={styles.colorPicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  colorDisplay: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  colorPicker: {
    width: '100%',
    height: 200,
  },
});

export default ColorSelector;
