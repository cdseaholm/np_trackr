import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env'
import { HandleCloseAllBottomSheets } from '../../basicHandles/HandleClose';
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';
import { UpdateItemAttributes } from '../../../../services/fetchServices/updates/UpdateItemAttributes';

export async function HandleAddItem(itemName, itemListID, itemSpecifics, attributes, navigation) {

  const ipHandle = `${EXPO_PUBLIC_LIST_IP_URL}/item`;

  if (!itemName || !itemListID) {
    Alert.alert('Please fill in required fields');
  } else {
    try {
      const response = await FetchCreate({name: itemName, listid: itemListID}, ipHandle);
      if (response.ok) {
          const data = await response.json();
          const item = {
            name: data.name,
            id: data.id,
            value: data.value,
            type: data.type,
            placeholder: data.placeholder,
            itemid: data.itemid
          };
          if (itemSpecifics.length > 0) {
          const itemSpecificsToPass = itemSpecifics.map((itemSpecific) => {
            return {id: itemSpecific.id, name: itemSpecific.name, value: itemSpecific.value, type: itemSpecific.type, itemid: itemListID, placeholder: itemSpecific.placeholder, value: itemSpecific.value};
          });
          const ipHandle = `${EXPO_PUBLIC_LIST_IP_URL}/item/attribute`;
          itemSpecificsToPass.forEach(async (thisItemSpecific) => {
            const response = await UpdateItemAttributes(ipHandle, thisItemSpecific.id, item.id);
            if (response.ok) {
              const data = await response.json();
              console.log('data:', data);
            } else {
              const data = await response.json();
              Alert.alert(data.message);
            }
          });
        }
        if (attributes.length > 0) {
          const attributesToPass = attributes.map((attribute) => {
            return {id: attribute.id, name: attribute.name, value: attribute.value, type: attribute.type, itemid: itemListID, placeholder: attribute.placeholder, value: attribute.value};
          });
          const ipHandleTwo = `${EXPO_PUBLIC_LIST_IP_URL}/attribute`;
          attributesToPass.forEach(async (attribute) => {
            const response = await FetchCreate(ipHandleTwo, attribute.id, item.id, 'Item');
            if (response.ok) {
              const data = await response.json();
              console.log('data:', data);
            } else {
              const data = await response.json();
              Alert.alert(data.message);
            }
          });
        }
        await HandleCloseAllBottomSheets(navigation);
      } else {
        const data = await response.json();
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
    
    
