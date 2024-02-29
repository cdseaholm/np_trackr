import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from './ModalSheetTemplate';
import { HandleClosePress } from '../basicHandles/HandleClose';
import { HandleCreateList } from '../basicHandles/HandleCreate';
import { FetchGetItems } from '../../../services/fetchServices/FetchGetItems';
import { EXPO_PUBLIC_LIST_TYPE_IP_URL } from '@env';



export async function CreateNewList() {
  const getIpHandle = `${EXPO_PUBLIC_LIST_TYPE_IP_URL}/get/all`;
  const navigation = useNavigation();
  const [listName, setlistName] = useState('');
  const [category, setCategory] = useState('');
  const items = await FetchGetItems(getIpHandle);
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