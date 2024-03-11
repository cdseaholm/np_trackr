import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddItem } from '../modalSheetHandles/HandleAddItem';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env';
import { FetchGetAllItems } from '../../../../services/fetchServices/FetchGetItems';
import { HandleValueChangeContext, RefreshContext } from '../modalSheetHandles/CreateContext';
import ListItemsForCreateItemForList from '../additions/listItems/ListItemsForCreateItemForList';
import CreateItemAttribute from './CreateItemAttribute';

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
      if (itemsFetch.data && itemsFetch.data.length > 0) {
        if (itemsFetch.data.length === attributes.length) {
          return;
        } else {
          const toPass = itemsFetch.data.map((item, index) => {
            return {name: item.name, placeholder: item.placeholder, index: index, listid: item.listid, type: item.type, id: item.id, value: ''};
          });
          console.log('toPass:', toPass);
          setAttributes(previousList => [...previousList, ...toPass]);
        }
      }
    };
    fetchItems();
  }, []);
  
  const updateValue = (index, newValue) => {
    setAttributes(prevAttributesList => {
      const updatedAttributeList = [...prevAttributesList];
      updatedAttributeList[index] = {...updatedAttributeList[index], value: newValue};
      return updatedAttributeList;
    });
    setItemSpecifics(prevItemSpecifics => {
      const updatedItemSpecifics = [...prevItemSpecifics];
      updatedItemSpecifics[index] = {...updatedItemSpecifics[index], value: newValue};
      return updatedItemSpecifics;
    });
  }

  const handleValueChange = (index, newValue) => {
    updateValue(index, newValue);
  }

  const refreshPage = (itemToAdd) => {
    if (itemToAdd && 'id' in itemToAdd) {
      const item = {id: itemToAdd.id, name: itemToAdd.name, placeholder: itemToAdd.placeholder, type: itemToAdd.type, value: itemToAdd.value, listid: itemToAdd.listid};
      setAttributes(prevAttributesList => [...prevAttributesList, item])
      setItemSpecifics(prevItemSpecifics => [...prevItemSpecifics, item]);
    } else {
      console.error('Invalid item:', itemToAdd);
    }
  }

  //staticbuttons
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleAddItem(itemName, list.id, itemSpecifics, attributes, navigation)},
  ];

  const attributionItems = [
    {text: '+ Add Attribute to this item only', onPress: () => {
      setShowCreateItem(false);
      setShowAttribute(true)}}
  ]

  const dimensionsHeight = (Dimensions.get('window').height / 4.5) + ((attributes.length + 2) * (50 + 30));
  const modalTop = useRef(new Animated.Value(0)).current;

  return (
    <RefreshContext.Provider value={refreshPage}>
      <HandleValueChangeContext.Provider value={handleValueChange}>
        {showCreateItem && 
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle={'Add Item to List: ' + list.name}
        modalTop={modalTop}
        attributeAddition={attributionItems}
        modalButtonItems={modalButtonItems}
        dimensionsHeight={dimensionsHeight}
      >
        <ListItemsForCreateItemForList items={attributes} listName={itemName} setListName={setItemName} />
      </ModalSheetTemplate>
        }
      {showAttribute && <CreateItemAttribute parentScreen={'Item'} setShowAttribute={setShowAttribute} setShowCreateList={setShowCreateItem} />}
      </HandleValueChangeContext.Provider>
    </RefreshContext.Provider>
  );
};

export default CreateItemForList
