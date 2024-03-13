export const CalendarFABs = [
    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
    { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
];

export const GoalFABs = [
    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
    { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
];

export const HomeFABs = [
    { icon: 'plus', label: 'Create', onPress: (navigation) => navigation.navigate('CreateNewList') },
    { icon: 'pencil', label: 'Edit List', onPress: (navigation) => navigation.navigate('EditModalSheetSet', {type: 'List'}) },
    { icon: 'pencil', label: 'Edit Item', onPress: (navigation) => navigation.navigate('EditModalSheetSet', {type: 'Item'}) },
    { icon: 'chart-bar', label: 'Add Item to List', onPress: (navigation) => navigation.navigate('CreateItemForList') },
];

export const StatFABs = [
    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
    { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
  ];