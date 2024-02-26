import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function AddToRankingList() {
  const navigation = useNavigation();
  const [rankingItemName, setRankingItemName] = useState('');
  const [rankingItemNotes, setRankingItemNotes] = useState('');
  const [rankValue, setRankValue] = useState('');
  const rankingList = ['Rankr'];
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setRankingItemName, value: rankingItemName},
    {placeHolder: 'Notes', onChangeText: setRankingItemNotes, value: rankingItemNotes},
    {placeHolder: 'Rank', onChangeText: setRankValue, value: rankValue}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create New Ranking List'
        dropDownItems={rankingList} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};
  

export default AddToRankingList
