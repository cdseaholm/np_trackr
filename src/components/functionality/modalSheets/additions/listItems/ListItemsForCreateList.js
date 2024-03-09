// ListItems.js
import React from 'react';
import { View, TextInput, Text } from 'react-native';

export const ListItemsForCreateList = ({ items, listName, setListName, attributeComment }) => (
  <View> 
    <View style={{marginVertical: 15, backgroundColor: 'transparent'}}>
      <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} value={listName} onChangeText={setListName} name={listName} placeholder='Name' />
    </View>
    {attributeComment === true && 
    <Text style={{flexDirection: 'row', alignSelf: 'center'}}>
      Attributes For This List: 
    </Text>
    } 
    {items.map((item, index) => (
      <View style={{marginVertical: 15}} key={index}> 
        <Text style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%'}}>  
          {item.name} 
        </Text>
      </View>
    ))}
  </View>
);

export default ListItemsForCreateList;