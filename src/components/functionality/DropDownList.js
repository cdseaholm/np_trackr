import PropTypes from 'prop-types'
import React from 'react';
import { Menu, IconButton, Divider, Provider } from 'react-native-paper';
import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { HandleClosePress } from './basicHandles/HandleClose';
import Icon from 'react-native-vector-icons/FontAwesome';

export function DropDownList({ items, onSelect }) {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const openMenu = () => setMenuVisible(true);
    const [state, setState] = useState({ open: false });
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const onStateChange = ({ open }) => {
        Animated.timing(overlayOpacity, {
        toValue: open ? 0.0 : 0,
        duration: 200,
        useNativeDriver: true,
        }).start();
        setState({ open });
    };

    return (
        <Provider>
        <TouchableOpacity onPress={openMenu}>
            <Animated.View style={{flexDirection: 'row', backgroundColor: 'white', borderRadius: '20', height: 40, justifyContent: 'space-between', paddingHorizontal: 20}}>
                <Menu
                    visible={isMenuVisible}
                    onDismiss={HandleClosePress}
                    anchor={<IconButton iconColor='white' icon="menu" size={30} onPress={openMenu} />}
                >
                    <MenuItems items={items} onSelect={onSelect} />
                    <Divider />
                    <Menu.Item onPress={HandleClosePress} title="Close Menu" />
                </Menu>
                <Icon name={state.open ? "chevron-up" : "chevron-down"} size={20} color="#000" style={{alignSelf: 'center'}} />
            </Animated.View>
        </TouchableOpacity>
        </Provider>
    )
}

DropDownList.propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export function MenuItems({ items, onSelect }) {
    return (
        <View>
        {items.map((item, index) => (
            <Menu.Item key={index} onPress={() => onSelect(item)} title={item} />
        ))}
        </View>
    )
}

MenuItems.propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
}