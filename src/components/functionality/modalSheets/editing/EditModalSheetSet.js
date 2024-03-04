import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { FetchGetAllItems, FetchGetItems } from '../../../../services/fetchServices/FetchGetItems';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env';


export function EditModalSheetSet() {
  const ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/get/all`;
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const modalTextInputItems = [];
  const [object, setObject] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
        const itemsFetch = await FetchGetAllItems(ipToPass);
        const itemsToPass = itemsFetch.map((item, index) => {
            return {label: item.name, index: index, category: item.category};
        });
        setItems(itemsToPass);
        console.log('useEffectLog:', itemsFetch);
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

  return (
      <ModalSheetTemplate 
          modalTopStartValue={0}
          modalTitle='Which list would you like to edit?'
          dropDownItems={items}
          modalTextInputItems={modalTextInputItems} 
          modalButtonItems={modalButtonItems}
          setDropDownSelectedValue={setSelectedValue}
          dropSelectedDownValue={selectedValue}
          setObject={setObject}
      />
  );
};

export default EditModalSheetSet