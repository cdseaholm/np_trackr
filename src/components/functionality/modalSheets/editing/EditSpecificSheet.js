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
    const [updatedSheet, setUpdatedSheet] = useState([]);
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
        }]);
        };
        fetchItems();
      }, []);

      currentSheet.map((item) => {
        setUpdatedSheet({
          name: item.name,
          category: item.category,
          notes: item.notes,
          rank: item.rank,
        });
      });


  const modalTextInputItems = [
    {
      placeholder: currentSheet.name, 
      onChangeText: (newName) => setUpdatedSheet({...updatedSheet, name: newName}), 
      value: updatedSheet.name, 
      keyboardType: 'default'
    },
    {
      placeholder: updatedSheet.notes, 
      onChangeText: (newNotes) => setUpdatedSheet({...updatedSheet, notes: newNotes}), 
      value: updatedSheet.notes, 
      keyboardType: 'default'
    }
  ];

  if (updatedSheet.category === 'Ranker' || updatedSheet.category === 'Ranker') {
    modalTextInputItems.push(
      {
        placeholder: updatedSheet.rank, 
        onChangeText: (newRank) => setUpdatedSheet({...updatedSheet, rank: newRank}), 
        value: updatedSheet.rank, 
        keyboardType: 'numeric'
      }
    )
  }

  var toStringTitle = `Update ${updatedSheet.category} List`;
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