import React from 'react';
import { View, Text } from 'react-native';

export const HomeCounter = ({ lists, items, attributes }) => (
    <View style={{ 
        position: 'absolute', 
        top: 300, 
        left: '30%', 
        right: '30%', 
        bottom: '40%', 
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
            <View style={{justifyContent: 'center'}}>

                <View style={{justifyContent: 'space-evenly', width: 100}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, margin: 10}}>
                    {lists.length > 0 ? (
                        <View>
                            <Text>Lists</Text>
                            <Text>{lists.length}</Text>
                        </View>
                    ) : (
                        <Text>No Lists</Text>
                    )}
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, margin: 10}}>
                    {items.length > 0 ? (
                        <View>
                            <Text>Items</Text>
                            <Text>{items.length}</Text>
                        </View>
                    ) : (
                        <Text>No Items</Text>
                    )}
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, margin: 10}}>
                    {attributes.length > 0 ? (
                        <View>
                            <Text>Attributes</Text>
                            <Text>{attributes.length}</Text>
                        </View>
                    ) : (
                        <Text>No Attributes</Text>
                    )}
                </View>
            </View>
        </View>
    </View>
);

export default HomeCounter
