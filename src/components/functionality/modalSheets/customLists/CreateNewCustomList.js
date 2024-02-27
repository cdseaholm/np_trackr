import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function CreateNewCustomList() {
  const navigation = useNavigation();
  const [customListName, setCustomListName] = useState('');
  const [customListNotes, setCustomListNotes] = useState('');
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setCustomListName, value: customListName, keyboardType: 'default'},
    {placeholder: 'Notes', onChangeText: setCustomListNotes, value: customListNotes, keyboardType: 'default'}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create New Custom List'
        dropDownItems={null} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};

export default CreateNewCustomList
