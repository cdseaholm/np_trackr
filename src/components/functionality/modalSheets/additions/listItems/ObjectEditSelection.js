import React from 'react';
import { View } from 'react-native';
import DropDownList from '../../../DropDownList';


export const ObjectEditSelection = ({ objects, setObject, dropDownPlaceholder, dropSelectedDownValue, setDropDownSelectedValue }) => (
        <View>
          {objects && 
          <View style={{marginVertical: 15}}>
            <DropDownList optionsList={objects} setObject={setObject} dropDownPlaceholder={dropDownPlaceholder} selectedValue={dropSelectedDownValue} setSelectedValue={setDropDownSelectedValue} />
          </View>
          }
        </View>
    
  );

export default ObjectEditSelection;