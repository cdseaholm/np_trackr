import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { FAB } from 'react-native-paper';
import { HomeFABs } from './screenFABs/HomeFAB';
import { CalendarFABs } from './screenFABs/CalendarFAB';
import { GoalFABs } from './screenFABs/GoalFAB';
import { StatFABs } from './screenFABs/StatFAB';
import { useNavigation } from '@react-navigation/native';

export function withFAB(WrappedComponent) {
  let fabs = [];
  if (WrappedComponent.name === 'Home') {
    fabs = HomeFABs;
  } else if (WrappedComponent.name === 'Calendar') {
    fabs = CalendarFABs;
  } else if (WrappedComponent.name === 'Goals') {
    fabs = GoalFABs;
  } else if (WrappedComponent.name === 'Stats') {
    fabs = StatFABs;
  } else {
    fabs = [...HomeFABs, ...CalendarFABs, ...GoalFABs, ...StatFABs];
  }

  return (props) => (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...props} />
      <FloatingActionButton fabs={fabs} />
    </View>
  );
}

export function FloatingActionButton({ fabs }) {
  const [state, setState] = React.useState({ open: false });
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const onStateChange = ({ open }) => {
    Animated.timing(overlayOpacity, {
      toValue: open ? 0.0 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setState({ open });
  };

  const styles = StyleSheet.create({
    openFAB: {
      position: 'absolute',
      margin: 0,
      right: 10,
      bottom: 70,
      backgroundColor: 'rgb(255, 0, 0, .1)',
    },
    closedFAB: {
      position: 'absolute',
      margin: 0,
      right: 10,
      bottom: 70,
      backgroundColor: 'rgb(255, 0, 0, .0)',
    },
  });

  const fabsWithNavigation = fabs.map(fab => ({
    ...fab,
    onPress: () => fab.onPress(navigation),
  }));


  return (
    <View style={StyleSheet.absoluteFill}>
      <FAB.Group
        open={state.open}
        icon={state.open ? 'close' : 'plus'}
        actions={fabsWithNavigation}
        onStateChange={onStateChange}
        style={state.open ? styles.openFAB : styles.closedFAB}
        />
    </View>
  );
}