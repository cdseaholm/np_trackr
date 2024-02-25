
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { HandleClosePress } from '../basicHandles/HandleClose';
import { useNavigation } from '@react-navigation/native';

export function AddToTrackingList() {
  const navigation = useNavigation();
  const [trackerName, setTrackerName] = useState('');
  const [trackingList, setTrackingList] = useState('');
  const [trackingNotes, setTrackingNotes] = useState('');

return (
  <View style={{flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: 'rgb(237, 235, 228)', 
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: 'space-evenly'}}>
    <Text style={{color: "black", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>
      Create New Ranking
    </Text>
    <View style={{flex: 1,
    justifyContent: 'center',
    justifyContent: 'space-evenly'}}>
      <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: '20', height: 40}}>
        <TextInput style={{fontSize: 20, color: "black", paddingLeft: 20}} placeholder="Which Tracker List should this go under?" onChangeText={setTrackingList} value={trackingList} />
      </View>
      <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: '20', height: 40}}>
        <TextInput style={{fontSize: 20, color: "black", paddingLeft: 20}} placeholder="Log Title" onChangeText={setTrackerName} value={trackerName} />
      </View>
      <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: '20', height: 40}}>
        <TextInput style={{fontSize: 20, color: "black", paddingLeft: 20}} placeholder="Notes?" onChangeText={setTrackingNotes} value={trackingNotes} />
      </View>
      <View style={{flexDirection: 'row', backgroundColor: 'transparent', paddingHorizontal: 10, justifyContent: 'space-between'}}>
        <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 15, alignContent: 'flex-start' }}
            onPress={() => HandleClosePress(navigation)}>
        <Text style={{fontSize: 22, color: "black"}}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'transparent', padding: 15, alignContent: 'flex-end' }}
            onPress={() => HandleClosePress(navigation)}>
        <Text style={{fontSize: 22, color: "black"}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>

  
);
};

export default AddToTrackingList
