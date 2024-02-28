import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_TYPE_IP_URL } from '@env';

export async function HandleCreateList(name, category, navigation) {
    
      if (!name || !category) {
        Alert.alert('Please fill in all fields');
      } else {
        try {
          const response = await fetch(`${EXPO_PUBLIC_LIST_TYPE_IP_URL}/create`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              name: name, 
              category: category })
          });
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
            Alert.alert('Building Table Failed');
          }
          
    
        } catch (error) {
          console.log('Error:', error);
        }
      }
    
    }
    
    
