import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env'
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';

export async function HandleAddAttribute(attributeName, parentid, parentType, attributeType, placeholder, value, navigation) {
    
    console.log('HandleAddAttribute:', attributeName, parentid, parentType, attributeType, placeholder, value);
  let parentIP = '/'
  if (parentType === 'Item') {
    parentIP = '/item/';
  } else {
    parentIP = '/';
  }
  const ipHandle = `${EXPO_PUBLIC_LIST_IP_URL}${parentIP}attribute`;

  if (!attributeName || !attributeType || !value) {
    Alert.alert('Please fill in required fields');
  } else {
    try {
      console.log('name:', attributeName);
      console.log('value:', value);
      console.log('type:', attributeType);
      console.log('placeholder:', placeholder);
      const response = await FetchCreate({name: attributeName, parentid: parentid, type: attributeType, placeholder: placeholder, value: value}, ipHandle);
      if (response.ok) {
        HandleClosePress(navigation);
      } else {
        const data = await response.json();
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
    
    
