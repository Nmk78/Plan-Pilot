// components/PopupModal.js
import React, { useState } from 'react';
import { View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import IconSelector from "./IconSelector";
import ColorSelector from './ColourSelector';

const PopupModal = ({ isVisible, onClose, setIcon, color, setColor }:any) => {


  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        {/* @ts-ignore */}
        <IconSelector onSelect={setIcon} />
        <ColorSelector setColor={setColor} color={color} />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Button title="X" onPress={onClose} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: 750,
    backgroundColor: '#031430',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
},
  closeButton: {
    paddingHorizontal: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: 20, // Optional border radius for the button
  },
});

export default PopupModal;
