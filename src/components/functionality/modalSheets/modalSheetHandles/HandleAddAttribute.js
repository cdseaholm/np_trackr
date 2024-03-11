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
      let responseOfCreation;
      if (parentType === 'Item') {
        responseOfCreation = await FetchCreate({name: attributeName, parentid: parentid, type: attributeType, placeholder: placeholder, value: ''}, ipHandle);
      } else {
        responseOfCreation = await FetchCreate({name: attributeName, parentid: parentid, type: attributeType, placeholder: placeholder, value: ''}, ipHandle);
      }
      if (responseOfCreation.ok) {
        const data = await responseOfCreation.json();
        var keyBoard = 'default';
        if (attributeType === 'number') {
          keyBoard = 'numeric';
        } else if (attributeType === 'date') {
          keyBoard = 'numeric';
        } else {
          keyBoard = 'default';
        }
        let itemToAdd = {id: data.id, placeholder: data.placeholder, name: data.name, type: data.type, listid: data.listid};
        if (parentType === 'Item') {
          itemToAdd = {id: data.id, placeholder: data.placeholder, name: data.name, type: data.type, listid: data.itemid, value: data.value, itemid: data.itemid};
        } else {
          itemToAdd = {id: data.id, placeholder: data.placeholder, name: data.name, type: data.type, listid: data.listid};
        }
        
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
    
    
