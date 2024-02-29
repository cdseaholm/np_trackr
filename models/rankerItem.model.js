module.exports = (sequelize, Sequelize) => {
    const RankerItem = sequelize.define("rankerItem", {
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.INTEGER
      }
    });
  
    return RankerItem;
  };