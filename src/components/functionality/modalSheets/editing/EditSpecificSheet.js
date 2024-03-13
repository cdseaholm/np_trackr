import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ModalSheetTemplate } from '../ModalSheetTemplate';
import { HandleCloseAllBottomSheets, HandleClosePress } from '../../basicHandles/HandleClose';
import { FetchGetAllItems, FetchGetItems } from '../../../../services/fetchServices/FetchGetItems';
import { Alert } from 'react-native';
import { UpdateList } from '../../../../services/fetchServices/FetchUpdateList';
import { EXPO_PUBLIC_LIST_IP_URL } from '@env';
import { NameChangeContext, RefreshContext } from '../modalSheetHandles/CreateContext';
import CreateItemAttribute from '../creation/CreateItemAttribute';
import { ListItemsForCreateList } from '../additions/listItems/ListItemsForCreateList';
import { ListItemsForCreateItemForList } from '../additions/listItems/ListItemsForCreateItemForList';


export function EditSpecificSheet({ route, navigation }) {
    //initialparams
    const object = route.params.selectedItemObject;
    const type = route.params.type;
    var selectedObject = null;
    var ipToPass = ``;
    var ipType = '';
    var objectsToPass = {};
    if (type === 'list') {
      selectedObject = {
        name: object.label,
        id: object.id,
        createdAt: object.createdAt,
        updatedAt: object.updatedAt
      }
      ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/attribute/get/all`;
      ipType = 'list';
      objectsToPass = <ListItemsForCreateList items={objects} objectName={objectName} setObjectName={setObjectName} attributeComment={attributeCommentBool} />;
    } else if (type === 'item') {
      selectedObject = {
        name: object.label,
        id: object.id,
        listid: object.listid,
        createdAt: object.createdAt,
        updatedAt: object.updatedAt
      }
      ipToPass = `${EXPO_PUBLIC_LIST_IP_URL}/item/attribute/get/all`;
      ipType = 'item';
      objectsToPass = <ListItemsForCreateItemForList items={objects} objectName={objectName} setObjectName={setObjectName} />;
    } else {
      Alert.alert('Error: EditSpecificSheet');
    }
    var toStringTitle = `Update ${selectedObject.name} List`;

    //state
    const [objectName, setObjectName] = useState('');
    const [showAttribute, setShowAttribute] = useState(false);
    const [showObjectList, setShowObjectList] = useState(true);
    const [objects, setObjects] = useState([]);

    //effects/functions
    useEffect(() => {
        const fetchItems = async () => {
          if (type === 'list') {
            const objectsFetched = await FetchGetItems(ipToPass);
            const objectsToPass = objectsFetched.map((item, index) => {
              return {label: item.name, index: index, updatedAt: item.updatedAt, createdAt: item.createdAt, id: item.id};
            });
            setObjects(objectsToPass)
          } else if (type === 'item') {
            const objectsFetched = await FetchGetItems(ipToPass);
            const objectsToPass = objectsFetched.map((item, index) => {
              return {label: item.name, index: index, listid: item.listid, updatedAt: item.updatedAt, createdAt: item.createdAt, id: item.id};
            });
            setObjects(objectsToPass);
          };
        fetchItems();
      }
      }, []);

      const updateName = (index, newName) => {
        setObjects(prevItemList => {
          const updatedItemList = [...prevItemList];
          updatedItemList[index] = {...updatedItemList[index], name: newName};
          return updatedItemList;
        })
      }
    
      const handleNameChange = (index, newName) => {
        updateName(index, newName);
      }
  
      const refreshPage = (itemToAdd) => {
        if (itemToAdd && 'id' in itemToAdd) {
          const item = {id: itemToAdd.id, name: itemToAdd.name, placeholder: itemToAdd.placeholder, type: itemToAdd.type, value: itemToAdd.value, listid: itemToAdd.listid};
          setItemList(prevItemList => [...prevItemList, item])
          attributeCounter += 1;
          attributeCommentBool = true;
        } else {
          console.error('Invalid item:', itemToAdd);
        }
      }

  const modalButtonItems = [
    {text: 'Back', onPress: () => HandleClosePress(navigation)},
    {text: 'Save', onPress: () => UpdateList(ipType, objects, objectName)}
  ];

  const attributionItems = [
    {text: '+ Add Attribute to List', onPress: () => {
      setShowObjectList(false);
      setShowAttribute(true)}}
  ]

  const dimensionsHeight = (Dimensions.get('window').height / 4.5) + ((objects.length + 2) * (50 + 30));
  const modalTop = useRef(new Animated.Value(0)).current;

  return (
    <RefreshContext.Provider value={refreshPage}>
    <NameChangeContext.Provider value={handleNameChange}>
      {showObjectList &&
      <ModalSheetTemplate 
        modalTopStartValue={0}
        modalTop={modalTop}
        modalTitle={toStringTitle.toString()}
        attributeAddition={attributionItems}
        modalButtonItems={modalButtonItems}
        dimensionsHeight={dimensionsHeight}
      >
        {objectsToPass}
      </ModalSheetTemplate>
      }
      {showAttribute && <CreateItemAttribute parentScreen={type} setShowAttribute={setShowAttribute} setShowObjectList={setShowObjectList} />}
    </NameChangeContext.Provider>
  </RefreshContext.Provider>
  );
};

export default EditSpecificSheet