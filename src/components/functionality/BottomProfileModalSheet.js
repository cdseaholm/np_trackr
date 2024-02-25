
import React from 'react';
import { View, Text } from 'react-native';
import { HandleDeleteProfile } from './authHandles/HandleDeleteProfile'
import { HandleClosePress } from './basicHandles/HandleClose';
import { useNavigation } from '@react-navigation/native';

export function BottomProfileModalSheet() {
  const navigation = useNavigation();

return (
  <View style={{flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: 'grey', 
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: 'space-evenly'}}>
      <Text style={{color: "white", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>
            Profile Options
          </Text>
    <View style={{flex: 1,
    justifyContent: 'center',
    justifyContent: 'space-evenly'}}>
          
      <Text style={{fontSize: 20, color: "white"}}>Customize Profile</Text>
      <Text style={{fontSize: 20, color: "white"}}>Change User Information</Text>
      <Text style={{fontSize: 20, color: "white"}} onPress={HandleDeleteProfile(navigation)}
      >Delete Profile</Text>
      <Text style={{fontSize: 20, color: "white"}} onPress={HandleClosePress(navigation)}>Close</Text>
      </View>
      </View>

  
);
};

export default BottomProfileModalSheet
