import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_TYPE_IP_URL } from '@env'
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';

export async function HandleCreateList(name, category, navigation) {
  var ipToPass = `${EXPO_PUBLIC_LIST_TYPE_IP_URL}/get/all`;
  if (!name || !category) {
    Alert.alert('Please fill in all fields');
  } else {
    try {
      const response = await FetchCreate([{ name: name, category: category }], ipToPass);
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data);
        if (category === 'Ranker') {
            navigation.navigate('AddToRankingList', { list: data });
        } else if (category === 'Tracker') {
            navigation.navigate('AddToTrackingList', { list: data });
        } else {
            navigation.navigate('AddToCustomList', { list: data, category: 'Custom' });
        }
      } else {
        const data = await response.json();
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
    
    
