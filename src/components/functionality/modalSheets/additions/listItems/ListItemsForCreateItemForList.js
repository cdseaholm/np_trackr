// ListItems.js
import React from 'react';
import { View, TextInput } from 'react-native';
import { HandleValueChangeContext } from '../../modalSheetHandles/CreateContext';

export const ListItemsForCreateItemForList = ({ items, listName, setListName }) =>     
        <View style={{marginVertical: 15}}> 
          <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder='Name' value={listName} onChangeText={setListName} name={listName} /> 
          <HandleValueChangeContext.Consumer>
          {handleValueChange => items.map((item, index) => (
            <View key={index} style={{marginVertical: 15}}> 
              <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder={item.placeholder} value={item.value} name={item.name} onChangeText={(newValue) => {
                 handleValueChange(index, newValue);
              }}/>
            </View>
          ))}
          </HandleValueChangeContext.Consumer>
        </View>


export default ListItemsForCreateItemForList;