import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function AddToTrackingList() {
  const navigation = useNavigation();
  const [trackingItemName, setTrackingItemName] = useState('');
  const [trackingItemNotes, setTrackingItemNotes] = useState('');
  const rankingList = ['Trackr'];
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setTrackingItemName, value: trackingItemName},
    {placeHolder: 'Notes', onChangeText: setTrackingItemNotes, value: trackingItemNotes}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Log new Trackr Item'
        dropDownItems={rankingList} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};

export default AddToTrackingList
