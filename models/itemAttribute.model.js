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
      placeholder: {
        type: Sequelize.STRING
      }
    });
  
    return ItemAttribute;
  };