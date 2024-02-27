import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from './ModalSheetTemplate';
import { HandleClosePress } from '../basicHandles/HandleClose';

export function CreateNewList() {
  const navigation = useNavigation();
  const [listName, setlistName] = useState('');
  const items = ['Ranker', 'Tracker', 'Custom'];
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setlistName, value: listName, keyboardType: 'default'}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create a new list'
        dropDownItems={items} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};

export default CreateNewList