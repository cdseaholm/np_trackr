import React, { useContext, useState} from 'react';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddAttribute } from '../modalSheetHandles/HandleAddAttribute';
import { RefreshContext } from '../modalSheetHandles/CreateContext';

export function CreateItemAttribute({parentScreen, navigation, setShowAttribute, setShowCreateList}) {
  const refreshPage = useContext(RefreshContext);

  var parentType = 0;
  let title = '';

  if (parentScreen === 1) {
    parentType = 'List'
    title = 'Create an Attribute for this List'
  } else {
    parentType = 'Item'
    title = 'Create an Attribute for this Item'
  }
  if (refreshPage) {
    console.log('refreshPage:', refreshPage);
  }
  
  const [attributeName, setAttributeName] = useState('');
  const [value, setValue] = useState(null);
  const [attributeType, setAttributeType] = useState(null);
  const [dropDownSelectedValue, setDropDownSelectedValue] = useState(null);

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => {setShowAttribute(false), setShowCreateList(true)}},
    {text: 'Create', onPress: () => HandleAddAttribute(attributeName, 0, parentType, attributeType.label, attributeName, value, refreshPage, setShowCreateList, setShowAttribute)}]
  
  var keyBoard = 'default';
  if (attributeType === 'number') {
    keyBoard = 'numeric';
  } else if (attributeType === 'date') {
    keyBoard = 'numeric';
  } else {
    keyBoard = 'default';
  }
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setAttributeName, value: attributeName, keyboardType: 'default'},
    {placeholder: 'Value', onChangeText: setValue, value: value, keyboardType: keyBoard}
  ];
  const dropDownItems = [
    {label: 'Text', value: 'text', index: 0},
    {label: 'Number', value: 'number', index: 1},
    {label: 'Date', value: 'date', index: 2},
    {label: 'True/False', value: 'boolean', index: 3},
    {label: 'List', value: 'list', index: 4}
  ];

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle={title}
        dropDownItems={dropDownItems} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={setDropDownSelectedValue}
        dropSelectedDownValue={dropDownSelectedValue}
        attributeAddition={null}
        setObject={setAttributeType}
        dropDownPlaceholder='Select an attribute type'
      />
  );
};

export default CreateItemAttribute
