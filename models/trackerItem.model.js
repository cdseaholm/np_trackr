module.exports = (sequelize, Sequelize) => {
    const TrackerItem = sequelize.define("trackerItem", {
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      }
    });
  
    return TrackerItem;
  };