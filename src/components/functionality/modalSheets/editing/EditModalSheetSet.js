import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { FetchGetAllItems, FetchGetItems } from '../../../../services/fetchServices/FetchGetItems';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env';
import { ObjectEditSelection } from '../additions/listItems/ObjectEditSelection';


export function EditModalSheetSet({route, navigation}) {
  const thisType = route.params.type;
  let parentType = '';
  let ipToPass = '';
  let placeholder = '';
  if (thisType === 'List') {
    parentType = 'list';
    ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/get/all`;
    placeholder = 'Select a list';
  } else if (thisType === 'Item') {
    parentType = 'item';
    ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/item/get/all`;
    placeholder = 'Select an item';
  } else { 
    console.error('Invalid type:', thisType);
  }
  const [objects, setObjects] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [object, setObject] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
        if (parentType === 'item') {
            const items = await FetchGetAllItems(ipToPass);
            const itemsToPass = items.map((item, index) => {
                return {id: item.id, name: item.name, label: item.name, index: index, listid: item.listid, createdAt: item.createdAt, updatedAt: item.updatedAt};
            });
            setObjects(itemsToPass);
            console.log('useEffectLog:', items);
        } else if (parentType === 'list') {
            const lists = await FetchGetAllItems(ipToPass);
            const listsToPass = lists.map((item, index) => {
                return {id: item.id, name: item.name, label: item.name, index: index, createdAt: item.createdAt, updatedAt: item.updatedAt};
            });
            setObjects(listsToPass);
            console.log('useEffectLog:', lists);
        } else {
            console.error('Invalid parentType:', parentType);
        }
    };
    fetchItems();
}, []);

  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Edit', onPress: () => {
            navigation.navigate('EditSpecificSheet', { selectedItemObject: object })
        
    }
    }
  ];

  const dimensionsHeight = (Dimensions.get('window').height / 4.5) + ((objects.length + 1) * (50));
  const modalTop = useRef(new Animated.Value(0)).current;
  console.log('objects:', objects);
  console.log('selectedValue:', selectedValue);
  return (
      <ModalSheetTemplate 
          modalTopStartValue={0}
          modalTitle='Which would you like to edit?'
          modalTop={modalTop}
          attributeAddition={null}
          modalButtonItems={modalButtonItems}
          dimensionsHeight={dimensionsHeight}
      >
        <ObjectEditSelection objects={objects} setObject={setObject} dropDownPlaceholder={placeholder} dropDownSelectedValue={selectedValue} setDropDownSelectedValue={setSelectedValue} />
      </ModalSheetTemplate>
  );
};

export default EditModalSheetSet