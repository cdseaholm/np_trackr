import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function CreateNewRankingList() {
  const navigation = useNavigation();
  const [rankingListName, setRankingListName] = useState('');
  const [rankingListNotes, setRankingListNotes] = useState('');
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setRankingListName, value: rankingListName},
    {placeHolder: 'Notes', onChangeText: setRankingListNotes, value: rankingListNotes}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create New Ranking List'
        dropDownItems={null} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
      />
  );
};

export default CreateNewRankingList
