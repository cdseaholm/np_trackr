export const HomeFABs = [
  { icon: 'plus', label: 'Create', onPress: (navigation) => navigation.navigate('CreateNewList') },
  { icon: 'pencil', label: 'Add/Edit', onPress: (navigation) => navigation.navigate('CreateNewList') },
  { icon: 'thumb-up', label: 'Log to a Ranker', onPress: (navigation) => navigation.navigate('AddToRankingList')},
  { icon: 'chart-bar', label: 'Log to a Tracker', onPress: (navigation) => navigation.navigate('AddToTrackingList')},
];