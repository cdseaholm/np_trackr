import React, {useContext} from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env'
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';

export async function HandleAddAttribute(attributeName, parentid, parentType, attributeType, placeholder, refreshPage, setShowCreateList, setShowAttribute) {
  
    
  let parentIP = '/'
  if (parentType === 'Item') {
    parentIP = '/item/';
  } else {
    parentIP = '/';
  }

  const ipHandle = `${EXPO_PUBLIC_LIST_IP_URL}${parentIP}attribute`;

  if (!attributeName || !attributeType) {
    Alert.alert('Please fill in required fields');
  } else {
    try {
      const response = await FetchCreate({name: attributeName, parentid: parentid, type: attributeType, placeholder: placeholder}, ipHandle);
      if (response.ok) {
        const data = await response.json();
        var keyBoard = 'default';
        if (attributeType === 'number') {
          keyBoard = 'numeric';
        } else if (attributeType === 'date') {
          keyBoard = 'numeric';
        } else {
          keyBoard = 'default';
        }
        const itemToAdd = {id: data.id, placeholder: data.placeholder, name: data.name, type: keyBoard};
        console.log('itemToAdd:', itemToAdd);
        refreshPage(itemToAdd);
        setShowAttribute(false);
        setShowCreateList(true);
      } else {
        const data = await response.json();
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
    
    
