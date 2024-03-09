import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomProfileModalSheet } from './src/components/functionality/modalSheets/BottomProfileModalSheet';
import Homepage from './src/screens/Homepage';
import MainAppbar from './src/components/functionality/Main-appbar';
import { CreateNewList } from './src/components/functionality/modalSheets/creation/CreateNewList';
import { CreateItemForList } from './src/components/functionality/modalSheets/creation/CreateItemForList';
import { CreateItemAttribute } from './src/components/functionality/modalSheets/creation/CreateItemAttribute';
import { EditModalSheetSet } from './src/components/functionality/modalSheets/editing/EditModalSheetSet';
import { EditSpecificSheet } from './src/components/functionality/modalSheets/editing/EditSpecificSheet';




const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const openProfileMenu = () => setProfileMenuVisible(true);
  const closeProfileMenu = () => setProfileMenuVisible(false);

  const rootScreens = [
    ['CreateItemForList', CreateItemForList],
    ['CreateItemAttribute', CreateItemAttribute],
    ['CreateNewList', CreateNewList],
    ['EditModalSheetSet', EditModalSheetSet],
    ['EditSpecificSheet', EditSpecificSheet],
  ]

  var rootScreensMap = rootScreens.map((screen, index) => {
    return <RootStack.Screen key={index} name={screen[0]} component={screen[1]} options={{ contentStyle: {backgroundColor: 'transparent'}}} />
  });

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
          {rootScreensMap}
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
