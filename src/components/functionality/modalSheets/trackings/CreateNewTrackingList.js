
import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';

export function CreateNewTrackingList() {
  const navigation = useNavigation();
  const [trackingListName, setTrackingListName] = useState('');
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleClosePress(navigation)}
  ];
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setTrackingListName, value: trackingListName, keyboardType: ''}
  ];

return (
  <ModalSheetTemplate 
        modalTopStartValue={0} 
        modalTitle='Create New Tracking List'
        dropDownItems={null}
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
  />
);
};

export default CreateNewTrackingList
