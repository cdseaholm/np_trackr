module.exports = (sequelize, Sequelize) => {
    const ItemAttribute = sequelize.define("itemAttribute", {
      name: {
        type: Sequelize.STRING
      },
      itemid: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      placeHolder: {
        type: Sequelize.STRING
      }
    });
  
    return ItemAttribute;
  };