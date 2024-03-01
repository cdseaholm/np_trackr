import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { FetchGetAllItems } from '../../../../services/fetchServices/FetchGetItems';
import { EXPO_PUBLIC_LIST_TYPE_IP_URL } from '@env';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform, Animated, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';


export function EditModalSheetSet() {
  const ipToPass = `${EXPO_PUBLIC_LIST_TYPE_IP_URL}/get/all`;
  const navigation = useNavigation();
  const [dropDownItems, setDropDownItems] = useState([]);

  const placeholder = {
    label: 'Select a category...',
    value: null,
};

  useEffect(() => {
      const fetchItems = async () => {
          const itemsFetch = await FetchGetAllItems(ipToPass);
          const fetchedItems = itemsFetch.map((item, index) => ({ name: item.name, key: index, category: item.category}));
          setDropDownItems(fetchedItems);
      };
      fetchItems();
  }, []);

  const handleValueChange = useCallback((value, index) => {
    setSelectedValue(value);
  }, []);

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Edit', onPress: () => navigation.navigate('EditSpecificSheet', { selectedItemObject: selectedItemObject })}
  ];

    var dimensionsHeight = (Dimensions.get('window').height / 4.5) + (1 * (50 + 30));
    var modalTop = useRef(new Animated.Value(0)).current;
  
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

  
    var buttonItems = modalButtonItems.map((item, index) => {
    return (
          <TouchableOpacity key={index} style={{ backgroundColor: 'transparent'}}
              onPress={item.onPress}>
            <Text style={{fontSize: 20, color: "black"}}>{item.text}</Text>
          </TouchableOpacity>
          );
    });  
  
    return (
        <KeyboardAvoidingView behavior='height' style={{flex: 1, justifyContent: 'flex-end'}}>
          <Animated.View style={{backgroundColor: 'rgb(237, 235, 228)', borderTopStartRadius: 20, borderTopEndRadius: 20, padding: 15, height: dimensionsHeight, top: modalTop}}>
            <Text style={{color: "black", textAlign: 'center', fontSize: 20, textDecorationLine: 'underline', marginVertical: 10}}>
              Which list would you like to edit?
            </Text>
            <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center', marginVertical: 15}} />
            <View style={{backgroundColor: 'white', borderRadius: '20', height: 50, justifyContent: 'center', paddingHorizontal: 15, fontSize: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RNPickerSelect
            placeholder={placeholder}
            items={dropDownItems}
            onValueChange={handleValueChange}
            value={selectedItem}
            />
                <Icon>
                    <FontAwesome5 name='chevron-down' size={15} color='grey' />
                </Icon>
                </View>
            </View>
            <Divider style={{backgroundColor: 'black', height: 1, width: '80%', alignSelf: 'center', marginVertical: 15}} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50, marginVertical: 10}}>
              {buttonItems}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
    );
  };

export default EditModalSheetSet