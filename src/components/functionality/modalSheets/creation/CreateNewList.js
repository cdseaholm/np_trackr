import React, { useState, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleCreateList } from '../modalSheetHandles/HandleCreateList';
import { NameChangeContext, RefreshContext } from '../modalSheetHandles/CreateContext';
import CreateItemAttribute from './CreateItemAttribute';
import { ListItemsForCreateList } from '../additions/listItems/ListItemsForCreateList';

export function CreateNewList() {
  //initialparams
  const navigation = useNavigation();
  let attributeCommentBool = false;
  let attributeCounter = 0;
  

  //state
  const [listName, setListName] = useState('');
  const [showAttribute, setShowAttribute] = useState(false);
  const [showCreateList, setShowCreateList] = useState(true);
  const [itemList, setItemList] = useState([]);

  //effects/functions
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
      attributeCounter += 1;
      attributeCommentBool = true;
    } else {
      console.error('Invalid item:', itemToAdd);
    }
  }

  //staticbuttons
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleCreateList(listName, itemList, navigation)},
  ];

  const attributionItems = [
    {text: '+ Add Attribute to List', onPress: () => {
      setShowCreateList(false);
      setShowAttribute(true)}}
  ]

  const dimensionsHeight = (Dimensions.get('window').height / 4.5) + ((itemList.length + 2) * (50 + 30));
  const modalTop = useRef(new Animated.Value(0)).current;

  return (
    <RefreshContext.Provider value={refreshPage}>
      <NameChangeContext.Provider value={handleNameChange}>
      {showCreateList && 
      <ModalSheetTemplate
        modalTopStartValue={0}
        modalTop={modalTop}
        modalTitle='Create a new list'
        attributeAddition={attributionItems}
        modalButtonItems={modalButtonItems}
        dimensionsHeight={dimensionsHeight}
      >
        <ListItemsForCreateList items={itemList} listName={listName} setListName={setListName} attributeComment={attributeCommentBool} />
      </ModalSheetTemplate>
  }
      {showAttribute && <CreateItemAttribute parentScreen={1} setShowAttribute={setShowAttribute} setShowCreateList={setShowCreateList} />}
      </NameChangeContext.Provider>
    </RefreshContext.Provider>
  );
};

export default CreateNewList