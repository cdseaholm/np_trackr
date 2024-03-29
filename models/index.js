const dbConfig = require("../config/db.config.js");
const dotenv = require('dotenv');
dotenv.config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.EXPO_PUBLIC_DATABASE_NAME, 
  process.env.EXPO_PUBLIC_DATABASE_USER, 
  process.env.EXPO_PUBLIC_DATABASE_PASSWORD, {
    host: process.env.EXPO_PUBLIC_DATABASE_HOST,
    dialect: process.env.EXPO_PUBLIC_DATABASE_DIALECT,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require("./accounts.model.js")(sequelize, Sequelize);
db.listType = require("./listType.model.js")(sequelize, Sequelize);
db.listItem = require("./listItem.model.js")(sequelize, Sequelize);
db.itemAttribute = require("./itemAttribute.model.js")(sequelize, Sequelize);
db.listAttribute = require("./listAttribute.model.js")(sequelize, Sequelize);

module.exports = db;