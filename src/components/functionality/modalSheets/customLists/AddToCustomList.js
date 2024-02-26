import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function AddToCustomList() {
  const navigation = useNavigation();
  const [customItemName, setCustomItemName] = useState('');
  const [customItemNotes, setCustomItemNotes] = useState('');
  const [rankValue, setRankValue] = useState('');
  const customList = ['Custom'];
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setCustomItemName, value: customItemName},
    {placeHolder: 'Notes', onChangeText: setCustomItemNotes, value: customItemNotes},
    {placeHolder: 'Rank', onChangeText: setRankValue, value: rankValue}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create New Custom List'
        dropDownItems={customList} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};

export default AddToCustomList
