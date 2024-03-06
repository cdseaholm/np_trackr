import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

export default function Attribute({ placeholder, keyboardType, onNameChange, styles, value }) {
  
  
    return (
      <TextInput
        style={styles}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onNameChange}
        value={value}
      />
    );
}

Attribute.defaultProps = {
    placeholder: '',
    keyboardType: '',
    value: ''
}

Attribute.propTypes = {
    placeholder: PropTypes.string.isRequired,
    keyboardType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}
  