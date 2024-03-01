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
    { icon: 'pencil', label: 'Add/Edit', onPress: (navigation) => navigation.navigate('EditModalSheetSet') },
    { icon: 'thumb-up', label: 'Log to a Ranker', onPress: (navigation) => navigation.navigate('AddToRankingList')},
    { icon: 'chart-bar', label: 'Log to a Tracker', onPress: (navigation) => navigation.navigate('AddToTrackingList')},
];

export const StatFABs = [
    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
    { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
  ];