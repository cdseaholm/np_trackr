import React from 'react';
import { Alert } from 'react-native';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env'
import { HandleCloseAllBottomSheets } from '../../basicHandles/HandleClose';
import { FetchCreate } from '../../../../services/fetchServices/FetchCreate';
import { UpdateItemAttributes } from '../../../../services/fetchServices/updates/UpdateItemAttributes';

export async function HandleAddItem(itemName, itemListID, attributes, navigation) {

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
            listid: data.listid
          };
          if (attributes.length > 0) {
          const itemSpecificsToPass = attributes.map((attribute) => {
            return {id: attribute.id, name: attribute.name, value: attribute.value, type: attribute.type, itemid: attribute.itemid, placeholder: attribute.placeholder, value: attribute.value, listid: attribute.listid};
          });
          console.log('itemSpecificsToPass id:', item.id);
          console.log("itemSpecificsToPass value", itemSpecificsToPass[0].value)
          const ipHandleTwo = `${ipHandle}/attribute`;
          for (var i = 0; i < itemSpecificsToPass.length; i++) {
            const thisItemSpecific = {
              id: itemSpecificsToPass[i].id,
              name: itemSpecificsToPass[i].name,
              value: itemSpecificsToPass[i].value,
              type: itemSpecificsToPass[i].type,
              itemid: itemSpecificsToPass[i].itemid,
              placeholder: itemSpecificsToPass[i].placeholder,
              listid: itemSpecificsToPass[i].listid
            };
            if (thisItemSpecific.listid === 0 || thisItemSpecific.listid === null) {
              const response = await UpdateItemAttributes(ipHandleTwo, thisItemSpecific, item.id);
              console.log('itemSpecificAttributesResponse:', response);
              if (response.ok) {
                console.log('data:', data);
              } else {
                const data = await response.json();
                Alert.alert(data.message);
              }
            } else {
              const response = await FetchCreate(thisItemSpecific, ipHandleTwo);
              console.log('itemSpecificResponse:', response);
              if (response.ok) {
                const data = await response.json();
                console.log('data:', data);
              } else {
                const data = await response.json();
                Alert.alert(data.message);
              }
            }
          };
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
    
    
