import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from './ModalSheetTemplate';
import { HandleClosePress } from '../basicHandles/HandleClose';
import { HandleCreateList } from './modalSheetHandles/HandleCreateList';
import { RefreshContext } from './modalSheetHandles/CreateContext';
import CreateItemAttribute from './customLists/CreateItemAttribute';

export function CreateNewList() {
  const navigation = useNavigation();
  const [listName, setListName] = useState('');
  const [showAttribute, setShowAttribute] = useState(false);
  const [showCreateList, setShowCreateList] = useState(true);
  const [modalTextInputItems, setModalTextInputItems] = useState([]);

  const handleNameChange = (index, newName) => {
    setModalTextInputItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].value = newName;
      return newItems;
    });
  };

  const refreshPage = (itemToAdd) => {
    setModalTextInputItems(...modalTextInputItems, {placeholder: itemToAdd.placeholder, keyboardType: itemToAdd.type, value: '', type: itemToAdd.type});
  }

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleCreateList(modalButtonItems, navigation)},
  ];

  const attributionItems = [
    {text: '+ Add Attribute to List', onPress: () => {
      setShowCreateList(false);
      setShowAttribute(true)}}
  ]

  return (
    <RefreshContext.Provider value={refreshPage}>
      {showCreateList && <ModalSheetTemplate
        modalTopStartValue={0}
        modalTitle='Create a new list'
        dropDownItems={null}
        listName={listName}
        setListName={setListName}
        modalTextInputItems={modalTextInputItems}
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={null}
        dropSelectedDownValue={null}
        attributeAddition={attributionItems}
        handleNameChange={handleNameChange}
      />
  }
      {showAttribute && <CreateItemAttribute parentScreen={1} setShowAttribute={setShowAttribute} setShowCreateList={setShowCreateList} />}
    </RefreshContext.Provider>
  );
};

export default CreateNewList