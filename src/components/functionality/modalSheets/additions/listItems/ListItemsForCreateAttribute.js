import React from 'react';
import { View, TextInput } from 'react-native';
import DropDownList from '../../../DropDownList';
import { NameChangeContext } from '../../modalSheetHandles/CreateContext';

export const ListItemsForCreateAttribute = ({ items, dropDownItems, setDropDownSelectedValue, dropSelectedDownValue, setObject, dropDownPlaceholder }) => (
        <View>
          {dropDownItems && 
          <View style={{marginVertical: 15}}>
            <DropDownList optionsList={dropDownItems} setSelectedValue={setDropDownSelectedValue} selectedValue={dropSelectedDownValue} setObject={setObject} dropDownPlaceholder={dropDownPlaceholder} />
          </View>
          } 
          <NameChangeContext.Consumer>
          {handleNameChange => items.map((item, index) => (
          <View key={index} style={{marginVertical: 15}}> 
            <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder='Attribute Name' value={item.value} name={item.name} onChangeText={(newName) => handleNameChange(index, newName)} /> 
          </View>
          ))}
          </NameChangeContext.Consumer>
        </View>
    
  );

export default ListItemsForCreateAttribute;