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
    {placeholder: 'Name', onChangeText: setCustomItemName, value: customItemName, keyboardType: 'default'},
    {placeholder: 'Notes', onChangeText: setCustomItemNotes, value: customItemNotes, keyboardType: 'default'},
    {placeholder: 'Rank', onChangeText: setRankValue, value: rankValue, keyboardType: 'number-pad'}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Add to Custom List'
        dropDownItems={customList} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};

export default AddToCustomList
