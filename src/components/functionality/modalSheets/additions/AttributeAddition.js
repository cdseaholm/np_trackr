import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const AttributeAddition = ({ items }) => items.map((item, index) => ( 
    <TouchableOpacity key={index} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: 'black', borderRadius: 20, padding: 5, alignItems: 'center', justifyContent: 'center' }} onPress={item.onPress}> 
      <Text style={{fontSize: 15, color: "black", paddingHorizontal: 5}}>
        {item.text} 
      </Text>
    </TouchableOpacity>
  ));

export default AttributeAddition;