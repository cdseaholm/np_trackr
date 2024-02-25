import React from 'react';
import '../../../assets/monthlybackground/jan.jpg'
import '../../../assets/monthlybackground/feb.png'
import '../../../assets/monthlybackground/march.jpg'
import '../../../assets/monthlybackground/april.jpg'
import '../../../assets/monthlybackground/may.jpg'
import '../../../assets/monthlybackground/june.jpg'
import '../../../assets/monthlybackground/july.jpg'
import '../../../assets/monthlybackground/aug.jpg'
import '../../../assets/monthlybackground/sept.jpg'
import '../../../assets/monthlybackground/oct.jpg'
import '../../../assets/monthlybackground/nov.jpg'
import '../../../assets/monthlybackground/dec.jpg'

function BackgroundMonth() {
  const currentDate = new Date();
  const month = currentDate.getMonth();

  const monthImages = {
    0: require('../../../assets/monthlybackground/jan.jpg'),
    1: require('../../../assets/monthlybackground/feb.png'),
    2: require('../../../assets/monthlybackground/march.jpg'),
    3: require('../../../assets/monthlybackground/april.jpg'),
    4: require('../../../assets/monthlybackground/may.jpg'),
    5: require('../../../assets/monthlybackground/june.jpg'),
    6: require('../../../assets/monthlybackground/july.jpg'),
    7: require('../../../assets/monthlybackground/aug.jpg'),
    8: require('../../../assets/monthlybackground/sept.jpg'),
    9: require('../../../assets/monthlybackground/oct.jpg'),
    10: require('../../../assets/monthlybackground/nov.jpg'),
    11: require('../../../assets/monthlybackground/dec.jpg'),
  };

  return monthImages[month];
}

export default BackgroundMonth;
