import React, { useEffect } from "react"
import { StatusBar } from 'expo-status-bar';
import {  View, Text, ImageBackground } from 'react-native';
import BackgroundMonth from '../../components/uiComponents/BackgroundMonth';
import HomeCounter from "../../components/uiComponents/homepageComponents/HomeCounter";
import { FetchGetAllItems } from "../../services/fetchServices/FetchGetItems";
import { EXPO_PUBLIC_LIST_IP_URL } from "@env"


export function Home() {
  const monthToUse = BackgroundMonth();
  const listsUrl = `${EXPO_PUBLIC_LIST_IP_URL}/get/all`;
  const itemsUrl = `${EXPO_PUBLIC_LIST_IP_URL}/item/get/all`;
  const attributesUrl = `${EXPO_PUBLIC_LIST_IP_URL}/item/attribute/get/all`;


  const [lists, setLists] = React.useState([])
  const [items, setItems] = React.useState([])
  const [attributes, setAttributes] = React.useState([])

      useEffect(() => {
      const fetchItems = async () => {
        const itemsFetched = await FetchGetAllItems(itemsUrl);
        if (itemsFetched && itemsFetched.length > 0) {
          const toPassItems = itemsFetched.map((item, index) => {
            return {name: item.name, id: item.id, index: index, listid: item.listid, createdAt: item.createdAt, updatedAt: item.updatedAt};
          });
          if (toPassItems.length > 0 && toPassItems !== undefined && toPassItems !== null) {
            if (itemsFetched.length === items.length) {
              return;
            } else {
              setItems(previousitems => [...previousitems, ...toPassItems]);
            }
          } else {
            console.log('issue fetching items')
          }
        }
      };
      fetchItems();
      }, []);

      useEffect(() => {
        const fetchLists = async () => {
          const listsFetched = await FetchGetAllItems(listsUrl);
          if (listsFetched && listsFetched.length > 0) {
            const toPassLists = listsFetched.map((list, index) => {
              return {name: list.name, id: list.id, index: index, createdAt: list.createdAt, updatedAt: list.updatedAt};
            });
            if (toPassLists.length > 0 && toPassLists !== undefined && toPassLists !== null) {
                if (listsFetched.length === lists.length) {
                  return;
                } else {
                  setLists(previousLists => [...previousLists, ...toPassLists]);
                } 
              } else {
                console.log('issue fetching lists')
              }
          }
        };
        fetchLists();
      }, []);

      useEffect(() => {
        const fetchAttributes = async () => {
          const attributesFetched = await FetchGetAllItems(attributesUrl);
          if (attributesFetched && attributesFetched.length > 0) {
            const toPassAttributes = attributesFetched.map((attribute, index) => {
              return {name: attribute.name, id: attribute.id, index: index, listid: attribute.listid, itemid: attribute.itemid, value: attribute.value, placeholder: attribute.placeholder, type: attribute.type, createdAt: attribute.createdAt, updatedAt: attribute.updatedAt};
            });
          if (toPassAttributes.length > 0 && toPassAttributes !== undefined && toPassAttributes !== null) {
              if (attributesFetched.length === attributes.length) {
                return;
              } else {
                setAttributes(previousAttributes => [...previousAttributes, ...toPassAttributes]);
              } 
            } else {
              console.log('issue fetching attributes')
            }
          }
        };
        fetchAttributes();
      }, []);



  return (

    <View style={{paddingTop: 40, height: '100%', backgroundColor: 'transparent'}}>
      <ImageBackground source={monthToUse} resizeMode="cover" style={{flex: 1}}> 
      
      
      <View style={{ 
        position: 'absolute', 
        top: 50, 
        left: '12%', 
        right: '12%', 
        bottom: '75%', 
        backgroundColor: 'white', 
        borderRadius: 20, 
        elevation: 10, 
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3},
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        borderColor: 'black', 
        borderWidth: 1, 
        justifyContent: "center"
      }}>
        <View style={{ flexDirection: 'row', justifyContent: "center" }}>
          <Text>Main Tracking Pages</Text>
        </View>
      </View>

        <HomeCounter lists={lists} items={items} attributes={attributes}/>

      <StatusBar style="auto" />
      </ImageBackground>
    </View>

  )
}

