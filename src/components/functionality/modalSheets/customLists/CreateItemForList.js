import React, { useState, useEffect } from 'react';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddItem } from '../modalSheetHandles/HandleAddItem';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env';
import { FetchGetAllItems } from '../../../../services/fetchServices/FetchGetItems';
import { NameChangeContext, RefreshItemContext, ItemSpecificNameChangeContext } from '../modalSheetHandles/CreateContext';

export function CreateItemForList({route, navigation}) {
  //initialparams
  const ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/attribute/get/`;
  const listData = route.params.list;
  var list = {
    id: 0,
    name: ''
  }
  if (listData) {
    list = {
      id: listData.id,
      name: listData.name
    }
  } 

  //state
  const [itemName, setItemName] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [itemSpecifics, setItemSpecifics] = useState([]);
  const [showAttribute, setShowAttribute] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(true);
  const url = `${ipToPass}${list.id}`;
  
  //effects/functions
  useEffect(() => {
    const fetchItems = async () => {
      const itemsFetch = await FetchGetAllItems(url);
      console.log('itemsFetch:', itemsFetch);
      var listAttributesToPass = [];
      if (itemsFetch && itemsFetch.length > 0) {
        const toPass = itemsFetch.map((item, index) => {
          return {name: item.name, placeholder: item.placeholder, index: index, listid: item.listid, type: item.type, id: item.id};
        });
        listAttributesToPass = toPass;
      }
      if (listAttributesToPass) {
        console.log('listAttributesToPass:', listAttributesToPass);
      setAttributes(previousList => [...previousList, listAttributesToPass]);
      }
    };
    fetchItems();
  }, []);

  const updateName = (index, newName) => {
    setAttributes(prevAttributesList => {
      const updatedAttributeList = [...prevAttributesList];
      updatedAttributeList[index] = {...updatedAttributeList[index], name: newName};
      return updatedAttributeList;
    })
  }

  const handleNameChange = (index, newName) => {
    updateName(index, newName);
  }

  const refreshPage = (itemToAdd) => {
    if (itemToAdd && 'id' in itemToAdd) {
      const item = {id: itemToAdd.id, name: itemToAdd.name, placeholder: itemToAdd.placeholder, type: itemToAdd.type};
      setAttributes(prevAttributesList => [...prevAttributesList, item])
      setItemSpecifics(prevItemSpecifics => [...prevItemSpecifics, item]);
    } else {
      console.error('Invalid item:', itemToAdd);
    }
  }

  //staticbuttons
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleAddItem(itemName, list.id, itemSpecifics, navigation)},
  ];

  const attributionItems = [
    {text: '+ Add Attribute to this item only', onPress: () => {
      setShowCreateItem(false);
      setShowAttribute(true)}}
  ]

  return (
    <RefreshItemContext.Provider value={refreshPage}>
      <NameChangeContext.Provider value={handleNameChange}>
        {showCreateItem && 
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle={'Add Item to List: ' + list.name}
        dropDownItems={null}
        itemName={itemName}
        setItemName={setItemName}
        modalTextInputItems={attributes} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={null}
        dropSelectedDownValue={null}
        attributeAddition={attributionItems}
        parent={'CreateItemForList'}
      />
        }
      {showAttribute && <CreateItemAttribute parentScreen={2} setShowAttribute={setShowAttribute} setShowCreateItem={setShowCreateItem} />}
      </NameChangeContext.Provider>
    </RefreshItemContext.Provider>
  );
};

export default CreateItemForList
