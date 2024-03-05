import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DropDownList = ({optionsList, setSelectedValue, selectedValue, setObject, dropDownPlaceholder}) => {
    const [selectedObject, setSelectedObject] = useState(null);

    var placeholder = {
        label: 'Select an item...',
        value: null
    } 

    if (dropDownPlaceholder) {
        placeholder = {
            label: dropDownPlaceholder,
            value: null};
    }

    useEffect(() => {
    }, [selectedValue, selectedObject], setObject);

    var options = optionsList.map((option) => {
        return {label: option.label, value: `${option.index}_${option.label}`, category: option.category};
    });

    return (
        <View style={{backgroundColor: 'white', borderRadius: '20', height: 50, justifyContent: 'center', paddingHorizontal: 15, fontSize: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => {
                    if (value !== null) {
                        const parts = value.split('_');
                        const objectIndex = parseInt(parts[0], 10);
                        setSelectedObject(optionsList[objectIndex]);
                        setSelectedValue(value);
                    }
                }}
                onDonePress={() => {
                        setObject(selectedObject);
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