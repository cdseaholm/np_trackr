// ListItems.js
import React from 'react';
import { View, TextInput } from 'react-native';
import { NameChangeContext } from '../../modalSheetHandles/CreateContext';

export const ListItemsForCreateItemForList = ({ items, listName, setListName }) =>     
        <View style={{marginVertical: 15}}> 
          <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder='Name' value={listName} onChangeText={setListName} name={listName} /> 
          <NameChangeContext.Consumer>
          {handleNameChange => items.map((item, index) => (
            <View key={index} style={{marginVertical: 15}}> 
              <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder={item.placeholder ?? 'List Value'} value={item.value} name={item.name} onChangeText={(newName) => handleNameChange(index, newName)} />
            </View>
          ))}
          </NameChangeContext.Consumer>
        </View>


export default ListItemsForCreateItemForList;