import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text }) => {
  const { buttonStyles, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = {
  textStyle: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyles: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#007aff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    borderBottomWidth: 2
  }
};
export { Button };
