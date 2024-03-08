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
  const [attributes, setAttributes] = useState([
    {id: 0, name: '', placeholder: 'Name', type: 'default', value: ''}
  ]);
  const [showAttribute, setShowAttribute] = useState(false);
  const [itemSpecificAttributes, setItemSpecificAttributes] = useState([]);
  const [showCreateItem, setShowCreateItem] = useState(true);
  const url = `${ipToPass}${list.id}`;
  
  //effects/functions
  useEffect(() => {
    const fetchItems = async () => {
      const itemsFetch = await FetchGetAllItems(url);
      console.log('itemsFetch:', itemsFetch);
      if (itemsFetch && itemsFetch.length > 0) {
        var listAttributesToPass = itemsFetch.map((item, index) => {
          return {name: item.name, placeholder: item.placeholder, index: index, listid: item.listid, type: item.type, id: item.id, value};
        });
        if (listAttributesToPass.length > 0) {
        setAttributes(listAttributesToPass);
        }
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

  const updateItemSpecificNameChange = (index, newName) => {
    setItemSpecificAttributes(prevAttributesList => {
      const updatedAttributeList = [...prevAttributesList];
      updatedAttributeList[index] = {...updatedAttributeList[index], name: newName};
      return updatedAttributeList;
    })
  }

  const handleNameChange = (index, newName) => {
    updateName(index, newName);
  }

  const handleItemSpecificNameChange = (index, newName) => {
    updateItemSpecificNameChange(index, newName);
  }

  const refreshPage = (itemToAdd) => {
    if (itemToAdd && 'id' in itemToAdd) {
      const item = {id: itemToAdd.id, name: itemToAdd.name, placeholder: itemToAdd.placeholder, type: itemToAdd.type};
      setItemSpecificAttributes(prevAttributesList => [...prevAttributesList, item])
    } else {
      console.error('Invalid item:', itemToAdd);
    }
  }

  //staticbuttons
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleAddItem(itemName, list.id, navigation)},
  ];

  const attributionItems = [
    {text: '+ Add Attribute to this item only', onPress: () => {
      setShowCreateItem(false);
      setShowAttribute(true)}}
  ]

  return (
    <RefreshItemContext.Provider value={refreshPage}>
      <ItemSpecificNameChangeContext.Provider value={handleItemSpecificNameChange}>
      <NameChangeContext.Provider value={handleNameChange}>
        {showCreateItem && 
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle={'Add Item to List: ' + list.name}
        dropDownItems={null}
        itemName={itemName}
        setItemName={setItemName}
        modalTextInputItems={[attributes, itemSpecificAttributes]} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={null}
        dropSelectedDownValue={null}
        attributeAddition={attributionItems}
        parent={'CreateItemForList'}
      />
        }
      {showAttribute && <CreateItemAttribute parentScreen={2} setShowAttribute={setShowAttribute} setShowCreateItem={setShowCreateItem} />}
      </NameChangeContext.Provider>
      </ItemSpecificNameChangeContext.Provider>
    </RefreshItemContext.Provider>
  );
};

export default CreateItemForList
