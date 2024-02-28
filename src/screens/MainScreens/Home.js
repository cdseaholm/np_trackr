import React from "react"
import { StatusBar } from 'expo-status-bar';
import {  View, Text, ImageBackground } from 'react-native';
import BackgroundMonth from '../../components/uiComponents/BackgroundMonth';


export function Home() {
  const monthToUse = BackgroundMonth();

  return (

    <View style={{paddingTop: 40, height: '100%', backgroundColor: 'transparent'}}>
      <ImageBackground source={monthToUse} resizeMode="cover" style={{flex: 1}}> 
      
      
      <View style={{ 
        position: 'absolute', 
        top: 50, 
        left: '12%', 
        right: '12%', 
        bottom: '75%', 
        backgroundColor: 'white', 
        borderRadius: 20, 
        elevation: 10, 
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        borderColor: 'black', 
        borderWidth: 1, 
        justifyContent: "center"
      }}>
        <View style={{ flexDirection: 'row', justifyContent: "center" }}>
          <Text>Main Tracking Pages</Text>
        </View>
      </View>
        
      
      

      <StatusBar style="auto" />
      </ImageBackground>
    </View>

  )
}

