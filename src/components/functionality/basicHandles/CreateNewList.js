
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { HandleClosePress } from './HandleClose';
import { useNavigation } from '@react-navigation/native';
import { DropDownList } from '../DropDownList';

export function CreateNewList() {
  const navigation = useNavigation();
  const [listType, setlistType] = useState('');
  const [listName, setlistName] = useState('');
  const items = ['Ranker', 'Tracker', 'Custom'];

return (
  <View style={{flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: 'rgb(237, 235, 228)', 
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: 'space-evenly'}}>
    <Text style={{color: "black", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>
      Let's Create a New List!
    </Text>
    <View style={{flex: 1,
    justifyContent: 'center',
    justifyContent: 'space-evenly'}}>

      <DropDownList items={items} hintText="What type of this will this be?" onSelect={() => {}} value={listType}/>
      <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: '20', height: 40}}>
        <TextInput style={{fontSize: 20, color: "black", paddingLeft: 20}} placeholder="Name" onChangeText={setlistName} value={listName} />
      </View>
      <View style={{flexDirection: 'row', backgroundColor: 'transparent', paddingHorizontal: 10, justifyContent: 'space-between'}}>
        <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 15, alignContent: 'flex-start' }}
            onPress={() => HandleClosePress(navigation)}>
        <Text style={{fontSize: 20, color: "black"}}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 15, alignContent: 'flex-end' }}
            onPress={() => HandleClosePress(navigation)}>
        <Text style={{fontSize: 20, color: "black"}}>Let's go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>

  
);
};

export default CreateNewList
