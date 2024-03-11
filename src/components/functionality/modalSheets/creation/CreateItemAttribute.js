import React, { useContext, useState, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleAddAttribute } from '../modalSheetHandles/HandleAddAttribute';
import { NameChangeContext, RefreshContext } from '../modalSheetHandles/CreateContext';
import ListItemsForCreateAttribute from '../additions/listItems/ListItemsForCreateAttribute';

export function CreateItemAttribute({parentScreen, navigation, setShowAttribute, setShowCreateList}) {
  const refreshPage = useContext(RefreshContext);

  var parentType = 'List';
  let title = '';

  if (parentScreen === 1) {
    parentType = 'List'
    title = 'Create an Attribute for this List'
  } else {
    parentType = 'Item'
    title = 'Create an Attribute for this Item'
  }
  
  const [attributeName, setAttributeName] = useState('');
  const [attributeType, setAttributeType] = useState(null);
  const [dropDownSelectedValue, setDropDownSelectedValue] = useState(null);

  const updateName = (index, newName) => {
    setAttributeName(newName);
  }

  const handleNameChange = (index, newName) => {
    updateName(index, newName);
  }

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => {setShowAttribute(false), setShowCreateList(true)}},
    {text: 'Create', onPress: () => HandleAddAttribute(attributeName, 0, parentType, attributeType.label, attributeName, refreshPage, setShowCreateList, setShowAttribute)}
  ]
  
  var keyBoard = 'default';
  if (attributeType === 'number') {
    keyBoard = 'numeric';
  } else if (attributeType === 'date') {
    keyBoard = 'numeric';
  } else {
    keyBoard = 'default';
  }
  const modalTextInputItems = [
    {name: '', placeholder: 'Name', onChangeText: setAttributeName, keyboardType: keyBoard}
  ];

  const dropDownItems = [
    {label: 'Text', value: 'text', index: 0},
    {label: 'Number', value: 'number', index: 1},
    {label: 'Date', value: 'date', index: 2},
    {label: 'True/False', value: 'boolean', index: 3},
    {label: 'List', value: 'list', index: 4}
  ];

  const dimensionsHeight = (Dimensions.get('window').height / 4.5) + (180);
  const modalTop = useRef(new Animated.Value(0)).current;

  return (
    <NameChangeContext.Provider value={handleNameChange}>
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTop={modalTop}
        modalTitle={title}
        attributeAddition={null}
        modalButtonItems={modalButtonItems}
        dimensionsHeight={dimensionsHeight}
      >
        <ListItemsForCreateAttribute items={modalTextInputItems} dropDownItems={dropDownItems} setDropDownSelectedValue={setDropDownSelectedValue} dropSelectedDownValue={dropDownSelectedValue} setObject={setAttributeType} dropDownPlaceholder='Type' />
      </ModalSheetTemplate>
    </NameChangeContext.Provider>
  );
};

export default CreateItemAttribute
