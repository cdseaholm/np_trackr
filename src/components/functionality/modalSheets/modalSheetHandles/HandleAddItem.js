import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_RANKER_ITEM_IP_URL } from '@env'
import { EXPO_PUBLIC_TRACKER_ITEM_IP_URL } from '@env'
import { EXPO_PUBLIC_CUSTOM_ITEM_IP_URL } from '@env'
import fetch from 'node-fetch';
import { HandleCloseAllBottomSheets } from '../../basicHandles/HandleClose';
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';

export async function HandleAddItem(handleParent, inputItemContent, navigation) {

  var itemContent = [];
  var itemCombo = [];
  var ipHandle = '';

  if (handleParent === 'AddToRankingList') {
    itemContent = [
      {
        name: inputItemContent.name,
        category: inputItemContent.category,
        notes: inputItemContent.notes,
        rank: inputItemContent.rank,
      }
    ]
    itemCombo = [{
      name: inputItemContent.name,
      category: inputItemContent.category,
      rank: inputItemContent.rank,
    }]
    ipHandle = EXPO_PUBLIC_RANKER_ITEM_IP_URL;
  } else if (handleParent === 'AddToTrackingList') {
    itemContent = [
      {
        name: inputItemContent.name,
        category: inputItemContent.category,
        notes: inputItemContent.notes
      }
    ]
    itemCombo = [{
      name: inputItemContent.name,
      category: inputItemContent.category
    }]
    ipHandle = EXPO_PUBLIC_TRACKER_ITEM_IP_URL;
  } else if (handleParent === 'AddToCustomList') {
    itemContent = [
      {
        name: inputItemContent.name,
        category: inputItemContent.category,
        notes: inputItemContent.notes
      }
    ]
    itemCombo = [{
      name: inputItemContent.name,
      category: inputItemContent.category
    }]
    ipHandle = EXPO_PUBLIC_CUSTOM_ITEM_IP_URL;
  } else {
    Alert.alert('Error: HandleAddItem');
  }

  if (!itemCombo) {
    Alert.alert('Please fill in required fields');
  } else {
    try {
      const response = await FetchCreate(itemContent, ipHandle);
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Data:', data);
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
    
    