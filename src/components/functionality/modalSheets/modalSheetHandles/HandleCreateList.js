import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env'
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';

export async function HandleCreateList(name, navigation) {
  var ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}`;
  if (!name) {
    Alert.alert('Please name this list');
  } else {
    try {
      const response = await FetchCreate({ name: name }, ipToPass);
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        const listData = {
          name: data.name,
          id: data.id
        }
        navigation.navigate('CreateItemForList', { list: listData });
      } else {
        const data = await response.json();
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
    
