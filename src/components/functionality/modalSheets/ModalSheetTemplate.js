import React, { useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, Animated, Dimensions } from 'react-native';
import DropDownList from '../DropDownList';
import { Divider } from 'react-native-paper';
import { NameChangeContext } from './modalSheetHandles/CreateContext';

export function ModalSheetTemplate({modalTopStartValue, modalTitle, dropDownItems, modalTextInputItems, modalButtonItems, setDropDownSelectedValue, dropSelectedDownValue, attributeAddition, setObject, dropDownPlaceholder, listName, setListName, totalItems}) {
  const handleNameChange = useContext(NameChangeContext);
  var dimensionsMultiplier = 4.5;
  var dropDownValue = 0;
  var attributionValue = 0;
  var nameNeededValue = 0;
  if (dropDownItems != null) {
    dropDownValue = 1;
  }
  if (attributeAddition != null) {
    attributionValue = 1;
  }
  let nameNeeded = true;
  if (modalTitle === 'Create an Attribute for this Item' || modalTitle === 'Create an Attribute for this List') {
    nameNeeded = false;
    nameNeededValue = 0;
  } else {
    nameNeeded = true;
    nameNeededValue = 1;
  }

  totalItems=modalTextInputItems.length + dropDownValue + attributionValue + nameNeededValue;

  var dimensionsHeight = (Dimensions.get('window').height / dimensionsMultiplier) + (totalItems * (50 + 30));
  var modalTop = useRef(new Animated.Value(modalTopStartValue)).current;

  useEffect(() => {
    var keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        Animated.timing(modalTop, {
          toValue: modalTopStartValue + 25,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );
    var keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(modalTop, {
          toValue: modalTopStartValue,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);
  
  var textItems = modalTextInputItems.map((item, index) => {
    return (
      <View key={index} style={{marginVertical: 15}}>
        <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder={item.placeholder} keyboardType={item.type} onChangeText={(newName) => handleNameChange(index, newName)} value={item.value} enterKeyHint='enter' />
    </View>
    );
  });

  var buttonItems = modalButtonItems.map((item, index) => {
    return (
      <TouchableOpacity key={index} style={{ backgroundColor: 'transparent'}}
          onPress={item.onPress}>
        <Text style={{fontSize: 20, color: "black"}}>{item.text}</Text>
      </TouchableOpacity>
    );
  });

  
  
  if (attributeAddition != null) {
  var attributeAddition = attributeAddition.map((item, index) => {
  return (
    <TouchableOpacity 
      key={index} 
      style={{ 
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 20, 
        padding: 5,
        alignItems: 'center', 
        justifyContent: 'center'
      }}
      onPress={item.onPress}>
      <Text style={{fontSize: 15, color: "black", paddingHorizontal: 5}}>{item.text}</Text>
    </TouchableOpacity>
  );
});

  } else {
    var attributeAddition = null;
  }
  return (
      <KeyboardAvoidingView behavior='height' style={{flex: 1, justifyContent: 'flex-end'}}>
        <Animated.View style={{backgroundColor: 'rgb(237, 235, 228)', borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15, height: dimensionsHeight, top: modalTop}}>
          <Text style={{color: "black", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline', marginVertical: 10}}>
            {modalTitle}
          </Text>
          <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center', marginVertical: 15}} />
          {nameNeeded &&
          <View style={{marginVertical: 15}}>
            <TextInput style={{height: 50, borderRadius: 20, fontSize: 15, color: "black", paddingLeft: 20, width: '100%', backgroundColor: 'white'}} placeholder={'Name'} keyboardType={'default'} onChangeText={setListName} value={listName} enterKeyHint='enter' />
          </View>
          }
          {dropDownItems &&
          <View style={{marginVertical: 15}}>
            <DropDownList optionsList={dropDownItems} setSelectedValue={setDropDownSelectedValue} selectedValue={dropSelectedDownValue} setObject={setObject} dropDownPlaceholder={dropDownPlaceholder} />
          </View>
          }
          {textItems}
          {attributeAddition != null &&
          <View style={{marginVertical: 15, alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
          {attributeAddition}
            </View>
          </View>
}
          <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center', marginVertical: 15}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, marginVertical: 10}}>
            {buttonItems}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
  );
};

export default ModalSheetTemplate;