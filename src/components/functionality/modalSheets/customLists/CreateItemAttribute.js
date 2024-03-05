import React, { useState} from 'react';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddAttribute } from '../modalSheetHandles/HandleAddAttribute';

export function CreateItemAttribute({parentScreen, navigation}) {

  var parentType = '';

  if (parentScreen === 'CreateNewList') {
    parentType = 'List'
  } else {
    parentType = 'Item'
  }
  const [attributeName, setAttributeName] = useState('');
  const [value, setValue] = useState(null);
  const [attributeType, setAttributeType] = useState(null);
  const [dropDownSelectedValue, setDropDownSelectedValue] = useState(null);

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleAddAttribute(attributeName, 0, parentType, attributeType.label, attributeName, value, navigation)}]
  const modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setAttributeName, value: attributeName, keyboardType: 'default'},
    {placeholder: 'Value', onChangeText: setValue, value: value, keyboardType: 'default'}
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
        modalTitle='Create an Attribute for this List'
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
