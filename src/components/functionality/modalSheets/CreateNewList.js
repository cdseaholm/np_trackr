import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from './ModalSheetTemplate';
import { HandleClosePress } from '../basicHandles/HandleClose';
import { HandleCreateList } from './modalSheetHandles/HandleCreateList';
import { CreateItemAttribute } from './customLists/CreateItemAttribute';


export function CreateNewList() {
  const navigation = useNavigation();
  const [listName, setlistName] = useState('');
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleCreateList(listName, navigation)},
  ];
  var modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setlistName, value: listName, keyboardType: 'default'}
  ];

  const attributionItems = [
    {text: 'Add Attribute to List', onPress: () => CreateItemAttribute()}
  ]

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create a new list'
        dropDownItems={null} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={null}
        dropSelectedDownValue={null}
        attributeAddition={attributionItems}

      />
  );
};

export default CreateNewList