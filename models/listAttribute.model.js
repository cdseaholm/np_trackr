module.exports = (sequelize, Sequelize) => {
    const ListAttribute = sequelize.define("listAttribute", {
      name: {
        type: Sequelize.STRING
      },
      listid: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      placeholder: {
        type: Sequelize.STRING
      }
    });
  
    return ListAttribute;
  };