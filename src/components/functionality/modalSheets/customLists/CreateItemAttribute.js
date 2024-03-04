import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleClosePress } from '../../basicHandles/HandleClose';
import { HandleAddItem } from '../modalSheetHandles/HandleAddItem';
import { EXPO_PUBLIC_LIST_TYPE_IP_URL } from '@env';
import { FetchGetAllItems } from '../../../../services/fetchServices/FetchGetItems';

export function CreateItemAttribute() {
  const ipToPass = `${EXPO_PUBLIC_LIST_TYPE_IP_URL}/get/all`; 
  const navigation = useNavigation();
  const [itemName, setItemName] = useState('');
  const [listItemNotes, setlistItemNotes] = useState('');
  const [listID, setListID] = useState('');
  const [rankValue, setRankValue] = useState('');
  const modalButtonItems = [
    {text: 'Cancel', onPress: () => HandleClosePress(navigation)},
    {text: 'Create', onPress: () => HandleAddItem('AddItemtoList', {name: itemName, listID: listID, notes: listItemNotes, rank: rankValue}, navigation)}]
  var modalTextInputItems = [
    {placeholder: 'Name', onChangeText: setItemName, value: customListName, keyboardType: 'default'},
  ];

  useEffect(() => {
    const fetchItems = async () => {
        const itemsFetch = await FetchGetAllItems(ipToPass);
        const itemsToPass = itemsFetch.map((item, index) => {
            return {label: item.name, index: index, listName: item.category};
        });
        setItems(itemsToPass);
        console.log('useEffectLog:', itemsFetch);
    };
    fetchItems();
  }, []);

  return (
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTitle='Create List Item'
        dropDownItems={null} 
        modalTextInputItems={modalTextInputItems} 
        modalButtonItems={modalButtonItems}
        setDropDownSelectedValue={setListID}
        dropSelectedDownValue={listID}
        attributeAddition={null}
      />
  );
};

export default CreateItemAttribute
