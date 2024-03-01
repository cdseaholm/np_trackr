import React, { useState, useEffect } from 'react';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleCloseAllBottomSheets, HandleClosePress } from '../../basicHandles/HandleClose';
import { FetchGetItems } from '../../../../services/fetchServices/FetchGetItems';
import { EXPO_PUBLIC_RANKER_ITEM_IP_URL } from '@env';
import { EXPO_PUBLIC_TRACKER_ITEM_IP_URL } from '@env';
import { EXPO_PUBLIC_CUSTOM_ITEM_IP_URL } from '@env';
import { Alert } from 'react-native';
import { UpdateList } from '../../../../services/fetchServices/FetchUpdateList';


export function EditSpecificSheet({ route, navigation }) {
    const selectedItem = route.params.selectedItemObject;
    const [updatedSheet, setUpdatedSheet] = useState([]);
    const [dropSelectedDownValue, setDropDownSelectedValue] = useState('');
    const [itemsFetched, setItemsFetched] = useState([]);
    const items = ['Ranker', 'Tracker', 'Custom'].map(item => ({ name: item, value: item }));
    

    var ipToPass = ``;
    var ipType = ``;
    if (!selectedItem) {
    if (!selectedItem.name) {
        Alert.alert('Error: EditSpecificSheet');
    } else {
        if (selectedItem.category === 'Ranker') {
        ipToPass = `${EXPO_PUBLIC_RANKER_ITEM_IP_URL}/get/${selectedItem.name}`;
        ipType = `${EXPO_PUBLIC_RANKER_ITEM_IP_URL}/update/${selectedItem.name}`
        } else if (selectedItem.category === 'Custom') {
        ipToPass = `${EXPO_PUBLIC_CUSTOM_ITEM_IP_URL}/get/${selectedItem.name}`;
        ipType = `${EXPO_PUBLIC_CUSTOM_ITEM_IP_URL}/update/${selectedItem.name}`
        } else if (selectedItem.category === 'Tracker') {
        ipToPass = `${EXPO_PUBLIC_TRACKER_ITEM_IP_URL}/get/${selectedItem.name}`;
        ipType = `${EXPO_PUBLIC_TRACKER_ITEM_IP_URL}/update/${selectedItem.name}`
        } else {
        Alert.alert('Error: EditSpecificSheet');
        }
    }
  } else {
    Alert.alert('Error: EditSpecificSheet');
    return null; // or render some fallback component
  }

    useEffect(() => {
        const fetchItems = async () => {
          const itemsFetched = await FetchGetItems(ipToPass);
          setItemsFetched(itemsFetched);
          setUpdatedSheet([{
            name: itemsFetched.name,
            category: itemsFetched.category,
            notes: itemsFetched.notes,
            rank: itemsFetched.rank,
        }]);
        };
        fetchItems();
      }, []);

      var toUpdateSheet = [{
        name: itemsFetched.name,
        category: itemsFetched.category,
        notes: itemsFetched.notes,
      }];

  if (selectedItem.category === 'Ranker') {
      toUpdateSheet.push({rank: itemsFetched.rank});
    }

  const modalTextInputItems = [
    {
      placeholder: updatedSheet.name, 
      onChangeText: (newName) => setUpdatedSheet({...updatedSheet, name: newName}), 
      value: updatedSheet.name, 
      keyboardType: 'default'
    },
    {
      placeholder: updatedSheet.category, 
      onChangeText: (newCategory) => setUpdatedSheet({...updatedSheet, category: newCategory}), 
      value: updatedSheet.category, 
      keyboardType: 'default'
    },
    {
      placeholder: updatedSheet.notes, 
      onChangeText: (newNotes) => setUpdatedSheet({...updatedSheet, notes: newNotes}), 
      value: updatedSheet.notes, 
      keyboardType: 'default'
    }
  ];

  if (updatedSheet.category === 'Ranker' || toUpdateSheet.category === 'Ranker') {
    modalTextInputItems.push(
      {
        placeholder: updatedSheet.rank, 
        onChangeText: (newRank) => setUpdatedSheet({...updatedSheet, rank: newRank}), 
        value: updatedSheet.rank, 
        keyboardType: 'numeric'
      }
    )
  }

  var toStringTitle = `Update ${toUpdateSheet.category} List`;
  const modalButtonItems = [
    {text: 'Back', onPress: () => HandleClosePress(navigation)},
    {text: 'Save', onPress: () => UpdateList(ipType, updatedSheet)
  .then(() => {
    HandleCloseAllBottomSheets(navigation);
  })},
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle={toStringTitle.toString()}
        dropDownItems={items}
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={setDropDownSelectedValue}
        dropSelectedDownValue={dropSelectedDownValue}
      />
  );
};

export default EditSpecificSheet