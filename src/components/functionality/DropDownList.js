import React, { useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropDownList = ({optionsList}) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const placeholder = {
        label: 'Select a category...',
        value: null,
    };

    const options = optionsList.map((option) => {
        return { label: option, value: option };
    });

    return (
        <View>
            <View style={{backgroundColor: 'white', borderRadius: '20', height: 50, justifyContent: 'center', alignItems: 'center', paddingLeft: 15, fontSize: 20}}>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={options}
                    onValueChange={(value) => {
                        setSelectedValue(value);
                    }}
                    value={selectedValue}
                />
            </View>
        </View>
    );
};

export default DropDownList;