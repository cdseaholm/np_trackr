import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function AddToTrackingList() {
  const navigation = useNavigation();
  const [trackingItemName, setTrackingItemName] = useState('');
  const [trackingItemNotes, setTrackingItemNotes] = useState('');
  const trackingList = ['Trackr'];
  const [trackingListState, setRankingListState] = useState('Ranker');
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setTrackingItemName, value: trackingItemName, keyboardType: 'default'},
    {placeholder: 'Notes', onChangeText: setTrackingItemNotes, value: trackingItemNotes, keyboardType: 'default'}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Log new Tracker Item'
        dropDownItems={trackingList} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={setRankingListState}
        dropSelectedDownValue={trackingListState}
      />
  );
};

export default AddToTrackingList
