import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env'
import { HandleCloseAllBottomSheets } from '../../basicHandles/HandleClose';
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';

export async function HandleAddItem(itemName, itemListID, navigation) {

  const ipHandle = `${EXPO_PUBLIC_LIST_IP_URL}/item`;

  if (!itemName || !itemListID) {
    Alert.alert('Please fill in required fields');
  } else {
    try {
      const response = await FetchCreate({name: itemName, listid: itemListID}, ipHandle);
      if (response.ok) {
        const data = await response.json();
        HandleCloseAllBottomSheets(navigation);
      } else {
        const data = await response.json();
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
    
    
