module.exports = (sequelize, Sequelize) => {
    const List_Type = sequelize.define("list_type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      }
    });
  
    return List_Type;
  };