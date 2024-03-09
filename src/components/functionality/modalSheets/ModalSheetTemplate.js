import React, { useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, Platform, Animated } from 'react-native';
import { Divider } from 'react-native-paper';
import {ModalButtonItems} from './additions/ModalButtonItems';
import {AttributeAddition} from './additions/AttributeAddition';

export function ModalSheetTemplate({modalTopStartValue, modalTop, modalTitle, attributeAddition, modalButtonItems, dimensionsHeight, children}) {
  

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

  return (
      <KeyboardAvoidingView behavior='height' style={{flex: 1, justifyContent: 'flex-end'}}>
        <Animated.View style={{backgroundColor: 'rgb(237, 235, 228)', borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15, height: dimensionsHeight, top: modalTop}}>

          {modalTitle != null &&
          <Text style={{color: "black", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline', marginVertical: 10}}>
            {modalTitle}
          </Text>
          }

          <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center', marginVertical: 15}} />

          {children}
          
          {attributeAddition != null &&
          <View style={{marginVertical: 15, alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <AttributeAddition items={attributeAddition} />
            </View>
          </View>
          }

          <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center', marginVertical: 15}} />
          
          {modalButtonItems != null &&
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, marginVertical: 10}}>
            <ModalButtonItems items={modalButtonItems} />
          </View>
          }

        </Animated.View>
      </KeyboardAvoidingView>
  );
};

export default ModalSheetTemplate;