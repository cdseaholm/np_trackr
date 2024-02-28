import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from './ModalSheetTemplate';
import { HandleClosePress } from '../basicHandles/HandleClose';
import { HandleCreateList } from './modalSheetHandles/HandleCreateList';

export function CreateNewList() {
  const navigation = useNavigation();
  const [listName, setlistName] = useState('');
  const [category, setCategory] = useState('');
  const items = ['Ranker', 'Tracker', 'Custom'];
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleCreateList(listName, category, navigation)}
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
        setDropDownSelectedValue={setCategory}
        dropSelectedDownValue={category}
      />
  );
};

export default CreateNewList