// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { ColorPicker } from 'react-native-color-picker';

// const ColorSelector = ({ onColorChange }: any) => {
//   const [color, setColor] = useState('#ffffff'); // Default color

//   const handleColorChange = (selectedColor: any) => {
//     setColor(selectedColor);
//     if (onColorChange) {
//       onColorChange(selectedColor);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={[styles.colorDisplay, { backgroundColor: color }]} />
//       <ColorPicker
//         color={color}
//         onColorChange={handleColorChange}
//         style={styles.colorPicker}
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => handleColorChange(color)} // Optional: Trigger color change on button press
//       >
//         <Text style={styles.buttonText}>Select Color</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   colorDisplay: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   colorPicker: {
//     width: '100%',
//     height: 200,
//   },
// });

// export default ColorSelector;

import React, { useState } from 'react';
import WheelColorPicker  from 'react-native-wheel-color-picker';
import { View, StyleSheet } from 'react-native';

const ColorSelector = ({ color, setColor }: any) => {
  // const [color, setColor] = useState('#FF0000');

  const handleColorChange = (selectedColor:any) => {
    setColor(selectedColor);
  };

  return (

  <View className='w-full h-auto flex'>
    <WheelColorPicker
            color={color}
            onColorChangeComplete={setColor}
          />
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPicker: {
    width: 300,
    height: 300,
  },
});

export default ColorSelector;
