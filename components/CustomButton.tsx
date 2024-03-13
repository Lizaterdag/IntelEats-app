import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, disabled=false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, disabled && styles.buttonDisabled]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffff', // Example blue color
    padding: 12,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow for Android
    shadowOpacity: 0.2, // Shadow for iOS
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 10, // Add vertical margin for spacing
    borderColor: '#485beb',
    borderWidth: 3,
  },
  buttonDisabled: {
    opacity: 0.5,
    // any other styles you want for the disabled state
  },
  text: {
    color: '#485beb', // White text color
    fontSize: 16, // Example font size
    fontWeight: 'bold', // Bold text
  },
});

export default CustomButton;
