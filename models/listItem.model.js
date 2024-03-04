module.exports = (sequelize, Sequelize) => {
    const ListItem = sequelize.define("listItem", {
      name: {
        type: Sequelize.STRING
      },
      listid: {
        type: Sequelize.INTEGER
      },
    });
  
    return ListItem;
  };