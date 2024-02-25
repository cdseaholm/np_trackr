import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomProfileModalSheet } from './src/components/functionality/BottomProfileModalSheet';
import Homepage from './src/screens/Homepage/Homepage';
import MainAppbar from './src/components/functionality/Main-appbar';
import { AddToRankingList } from './src/components/functionality/rankings/AddToRankingList';
import { CreateNewRankingList } from './src/components/functionality/rankings/CreateNewRankingList';
import { CreateNewTrackingList } from './src/components/functionality/trackings/CreateNewTrackingList';
import { AddToTrackingList } from './src/components/functionality/trackings/AddToTrackingList';
import { AddToCustomList } from './src/components/functionality/customLists/AddToCustomList';
import { CreateNewCustomList } from './src/components/functionality/customLists/CreateNewCustomList';
import { CreateNewList } from './src/components/functionality/basicHandles/CreateNewList';


const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const openProfileMenu = () => setProfileMenuVisible(true);
  const closeProfileMenu = () => setProfileMenuVisible(false);

  return (
    <RootStack.Navigator>
      <RootStack.Group mode='modal' initialRouteName='Homepage' screenOptions={({ route }) => ({
        header: () => <MainAppbar openMenu={openMenu} closeMenu={closeMenu} isMenuVisible={isMenuVisible} openProfileMenu={openProfileMenu} closeProfileMenu={closeProfileMenu} isProfileMenuVisible={isProfileMenuVisible} />,
      })}>
        <RootStack.Screen name="Homepage" component={Homepage} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal", animation: "slide_from_bottom", header: () => {}}}>
          <RootStack.Screen 
            name="BottomProfileModalSheet" 
            component={BottomProfileModalSheet} 
            options={{ contentStyle: {position: 'absolute', top: '60%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="AddToRankingList" 
            component={AddToRankingList} 
            options={{ contentStyle: {position: 'absolute', top: '30%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="CreateNewRankingList" 
            component={CreateNewRankingList} 
            options={{ contentStyle: {position: 'absolute', top: '50%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="AddToTrackingList" 
            component={AddToTrackingList} 
            options={{ contentStyle: {position: 'absolute', top: '30%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="CreateNewTrackingList" 
            component={CreateNewTrackingList} 
            options={{ contentStyle: {position: 'absolute', top: '50%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="AddToCustomList" 
            component={AddToCustomList} 
            options={{ contentStyle: {position: 'absolute', top: '30%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="CreateNewCustomList" 
            component={CreateNewCustomList} 
            options={{ contentStyle: {position: 'absolute', top: '50%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
          <RootStack.Screen 
            name="CreateNewList" 
            component={CreateNewList} 
            options={{ contentStyle: {position: 'absolute', top: '50%', right: 0, left: 0, bottom: 0, backgroundColor: 'transparent'}}}
          />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}
