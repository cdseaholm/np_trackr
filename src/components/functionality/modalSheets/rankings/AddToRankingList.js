import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddItem } from '../modalSheetHandles/HandleAddItem';

export function AddToRankingList() {
  const navigation = useNavigation();
  const [rankingItemName, setRankingItemName] = useState('');
  const [rankingItemNotes, setRankingItemNotes] = useState('');
  const [rankValue, setRankValue] = useState('');
  const [rankingListState, setRankingListState] = useState('');
  const rankingList = ['Rankr', 'TV Rankings', 'Movie Rankings', 'Dinner Rankings'];
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleAddItem('AddToRankingList', {name: rankingItemName, category: rankingListState, notes: rankingItemNotes, rank: rankValue}, navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setRankingItemName, value: rankingItemName, keyboardType: 'default'},
    {placeholder: 'Notes', onChangeText: setRankingItemNotes, value: rankingItemNotes, keyboardType: 'default'},
    {placeholder: 'Rank', onChangeText: setRankValue, value: rankValue, keyboardType: 'number-pad'}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Add Item to Ranking List'
        dropDownItems={rankingList} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={setRankingListState}
        dropSelectedDownValue={rankingListState}
      />
  );
};
  

export default AddToRankingList
