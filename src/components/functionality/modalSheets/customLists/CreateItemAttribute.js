import React, { useContext, useState } from 'react';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleAddAttribute } from '../modalSheetHandles/HandleAddAttribute';
import { NameChangeContext, RefreshContext } from '../modalSheetHandles/CreateContext';

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

  return (
    <NameChangeContext.Provider value={handleNameChange}>
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
    </NameChangeContext.Provider>
  );
};

export default CreateItemAttribute
