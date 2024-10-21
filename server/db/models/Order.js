const Sequelize = require("sequelize");
const db = require("../database");

const Order = db.define('Order', {
	  orderTotal: {
		type: Sequelize.DECIMAL(10, 2),
		defaultValue: 0.0,
	  },
	  UUID: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
	  },
	  purchaseDate: {
		type: Sequelize.DATE,
	  },
});

module.exports = Order;
