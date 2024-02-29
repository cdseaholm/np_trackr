module.exports = (sequelize, Sequelize) => {
    const ListType = sequelize.define("listType", {
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      }
    });
  
    return ListType;
  };