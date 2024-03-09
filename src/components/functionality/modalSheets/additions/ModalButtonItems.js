import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const ModalButtonItems = ({ items }) => items.map((item, index) => ( 
  <TouchableOpacity key={index} style={{ backgroundColor: 'transparent'}} onPress={item.onPress}> 
    <Text style={{fontSize: 20, color: "black"}}>
      {item.text}
    </Text>
  </TouchableOpacity>
));

export default ModalButtonItems;