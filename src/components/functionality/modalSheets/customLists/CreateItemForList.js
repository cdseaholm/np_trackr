import React, { useState, useEffect } from 'react';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddItem } from '../modalSheetHandles/HandleAddItem';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env';
import { FetchGetAllItems } from '../../../../services/fetchServices/FetchGetItems';
import { CreateItemAttribute } from './CreateItemAttribute';

export function CreateItemForList({route, navigation}) {
  const ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/attribute/get/all`;
  const listData = route.params.list;
  const list = {
    name: listData.name,
    id: listData.id
  }
  const [itemName, setItemName] = useState('');
  const [listID, setListID] = useState('');
  const [attributes, setAttributes] = useState([]);
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => {
      HandleAddItem('AddItemtoList', {name: itemName, listID: listID}, navigation)}},
    ]
  var modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setItemName, value: itemName, keyboardType: 'default'}
  ];
  const params = new URLSearchParams(list.id).toString();
  const url = `${ipToPass}?${params}`;
  
  useEffect(() => {
    const fetchItems = async () => {
      const itemsFetch = await FetchGetAllItems(url);
      let listAttributesToPass = [];
      if (itemsFetch.length !== 0) {
        listAttributesToPass = itemsFetch.map((item, index) => {
          return {placeholder: item.placeholder, index: index, value: item.value, type: item.type, name: item.name};
        });
        setAttributes(listAttributesToPass);
      }
      console.log('useEffectLog:', listAttributesToPass);
    };
    fetchItems();
  }, []);

  for (let i = 0; i < attributes.length; i++) {
    modalTextInputItems.push({placeholder: attributes[i].placeholder, onChangeText: setItemName, value: attributes[i].value, keyboardType: attributes[i].type});
  }

  const attributionItems = [
    {text: 'Add Attribute to only this item', onPress: () => CreateItemAttribute()}
  ]

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle={'Add Item to List' + list.name}
        dropDownItems={null}
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={null}
        dropSelectedDownValue={null}
        attributeAddition={attributionItems}
      />
  );
};

export default CreateItemForList
