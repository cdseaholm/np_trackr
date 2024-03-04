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
    const object = route.params.selectedItemObject;
    const [dropSelectedDownValue, setDropDownSelectedValue] = useState('');
    const [currentSheet, setCurrentSheet] = useState([]);
    const items = ['Ranker', 'Tracker', 'Custom'].map(item => ({ name: item, value: item }));
    var selectedItem = null;
    if (!object) {
        Alert.alert('Error: EditSpecificSheet');
    } else {
    selectedItem = {
        name: object.label,
        category: object.category,
    }
  }

    var ipToPass = ``;
    var ipType = ``;
    if (!selectedItem) {
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

    useEffect(() => {
        const fetchItems = async () => {
          const itemsFetched = await FetchGetItems(ipToPass);
          const itemsToPass = itemsFetched.map((item, index) => {
            return {label: item.name, index: index, category: item.category, notes: item.notes, rank: item.rank};
          });
          setCurrentSheet([{
            name: itemsToPass.label,
            category: itemsToPass.category,
            notes: itemsToPass.notes,
            rank: itemsToPass.rank,
            index: itemsToPass.index
        }]);
        };
        fetchItems();
      }, []);


  const modalTextInputItems = [
    {
      placeholder: currentSheet.name, 
      onChangeText: (newName) => setUpdatedSheet({...currentSheet, name: newName}), 
      value: currentSheet.name, 
      keyboardType: 'default'
    },
    {
      placeholder: currentSheet.notes, 
      onChangeText: (newNotes) => setUpdatedSheet({...currentSheet, notes: newNotes}), 
      value: currentSheet.notes, 
      keyboardType: 'default'
    }
  ];

  if (currentSheet.category === 'Ranker' || currentSheet.category === 'Ranker') {
    modalTextInputItems.push(
      {
        placeholder: currentSheet.rank, 
        onChangeText: (newRank) => setUpdatedSheet({...currentSheet, rank: newRank}), 
        value: currentSheet.rank, 
        keyboardType: 'numeric'
      }
    )
  }

  var toStringTitle = `Update ${currentSheet.category} List`;
  const modalButtonItems = [
    {text: 'Back', onPress: () => HandleClosePress(navigation)},
    {text: 'Save', onPress: () => UpdateList(ipType, currentSheet)
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