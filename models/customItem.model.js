module.exports = (sequelize, Sequelize) => {
    const CustomItem = sequelize.define("customItem", {
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
  
    return CustomItem;
  };