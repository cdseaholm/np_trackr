import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from './ModalSheetTemplate';
import { HandleClosePress } from '../basicHandles/HandleClose';
import { HandleCreateList } from './modalSheetHandles/HandleCreateList';
import { NameChangeContext, RefreshContext } from './modalSheetHandles/CreateContext';
import CreateItemAttribute from './customLists/CreateItemAttribute';

export function CreateNewList() {
  const navigation = useNavigation();
  const [listName, setListName] = useState('');
  const [showAttribute, setShowAttribute] = useState(false);
  const [showCreateList, setShowCreateList] = useState(true);
  const [itemList, setItemList] = useState([]);

  const updateName = (index, newName) => {
    setItemList(prevItemList => {
      const updatedItemList = [...prevItemList];
      updatedItemList[index] = {...updatedItemList[index], name: newName};
      return updatedItemList;
    })
  }

  const handleNameChange = (index, newName) => {
    updateName(index, newName);
  }

  const refreshPage = (itemToAdd) => {
    if (itemToAdd && 'id' in itemToAdd) {
      const item = {id: itemToAdd.id, name: itemToAdd.name, placeholder: itemToAdd.placeholder, type: itemToAdd.type};
      setItemList(prevItemList => [...prevItemList, item])
    } else {
      console.error('Invalid item:', itemToAdd);
    }
  }

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleCreateList(listName, itemList, navigation)},
  ];

  const attributionItems = [
    {text: '+ Add Attribute to List', onPress: () => {
      setShowCreateList(false);
      setShowAttribute(true)}}
  ]

  return (
    <RefreshContext.Provider value={refreshPage}>
      <NameChangeContext.Provider value={handleNameChange}>
      {showCreateList && <ModalSheetTemplate
        modalTopStartValue={0}
        modalTitle='Create a new list'
        dropDownItems={null}
        listName={listName}
        setListName={setListName}
        modalTextInputItems={itemList}
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={null}
        dropSelectedDownValue={null}
        attributeAddition={attributionItems}
      />
  }
      {showAttribute && <CreateItemAttribute parentScreen={1} setShowAttribute={setShowAttribute} setShowCreateList={setShowCreateList} />}
      </NameChangeContext.Provider>
    </RefreshContext.Provider>
  );
};

export default CreateNewList