import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, Animated, Dimensions } from 'react-native';
import DropDownList from '../DropDownList';
import { Divider } from 'react-native-paper';

export function ModalSheetTemplate({modalTopStartValue, modalTitle, dropDownItems, modalTextInputItems, modalButtonItems}) {
  var dimensionsMultiplier = 2.5;
  var dimensionsHeight = Dimensions.get('window').height / dimensionsMultiplier;
  let dropDownValue = 0;
  if (dropDownItems != null) {
    dropDownValue = 1;
  }
  totalItems=modalButtonItems.length + modalTextInputItems.length + dropDownValue

  if (totalItems > 3) {
    for (let i = 0; i < totalItems; i++) {
      dimensionsHeight -= 1;
    }
  }
  const modalTop = useRef(new Animated.Value(modalTopStartValue)).current;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        Animated.timing(modalTop, {
          toValue: modalTopStartValue + 25,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
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

  const textItems = modalTextInputItems.map((item, index) => {
    return (
            <TextInput key={index} style={{fontSize: 15, color: "black", paddingLeft: 20, width: '100%'}} placeholder={item.placeholder} onChangeText={item.onChangeText} value={item.value} />
        );
    });

  const buttonItems = modalButtonItems.map((item, index) => {
    return (
        <TouchableOpacity key={index} style={{ backgroundColor: 'transparent', padding: 15, alignContent: 'flex-start' }}
            onPress={item.onPress}>
        <Text style={{fontSize: 20, color: "black"}}>{item.text}</Text>
        </TouchableOpacity>
        );
    });  

  return (
      <KeyboardAvoidingView behavior='height' style={{flex: 1, justifyContent: 'flex-end'}}>
        <Animated.View style={{backgroundColor: 'rgb(237, 235, 228)', borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15, height: dimensionsHeight, top: modalTop, justifyContent: 'space-evenly'}}>
          <Text style={{color: "black", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline'}}>
            {modalTitle}
          </Text>
          {dropDownItems !== null &&
          <DropDownList optionsList={dropDownItems} />
          }
          <View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: '20', height: 50}}>
            {textItems}
          </View>
          <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center'}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {buttonItems}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
  );
};

export default ModalSheetTemplate;