const Sequelize = require("sequelize");
const db = require("../database");

const Resource = db.define('Resource', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  unit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  supplierId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Suppliers', // Refers to Supplier table
      key: 'id',
    },
  },
});

module.exports = Resource;
