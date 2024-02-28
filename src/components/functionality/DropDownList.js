import React, { useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DropDownList = ({optionsList, setSelectedValue, selectedValue}) => {

    const placeholder = {
        label: 'Select a category...',
        value: null,
    };

    const options = optionsList.map((option) => {
        return { label: option, value: option };
    });

    return (
            <View style={{backgroundColor: 'white', borderRadius: '20', height: 50, justifyContent: 'center', paddingHorizontal: 15, fontSize: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={options}
                    onValueChange={(value) => {
                        setSelectedValue(value);
                    }}
                    value={selectedValue}
                />
                <Icon>
                    <FontAwesome5 name='chevron-down' size={15} color='grey' />
                </Icon>
                </View>
            </View>
    );
};

export default DropDownList;