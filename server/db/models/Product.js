const Sequelize = require("sequelize");
const db = require("../database");

const Product = db.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
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

Product.afterCreate(async (product) => {
  if (product.id === 4) {
    await product.addOrder(1, {
      through: { quantity: 1, totalPrice: product.price },
    });
    const cart1 = await Order.findByPk(1);
    await cart1.increment(
      { orderTotal: product.price },
      {
        where: {
          id: 1,
        },
      }
    );
    await product.addOrder(2, {
      through: { quantity: 1, totalPrice: product.price },
    });
    const cart2 = await Order.findByPk(2);
    await cart2.increment(
      { orderTotal: product.price },
      {
        where: {
          id: 2,
        },
      }
    );
    await product.addOrder(3, {
      through: { quantity: 1, totalPrice: product.price },
    });
    const cart3 = await Order.findByPk(3);
    await cart3.increment(
      { orderTotal: product.price },
      {
        where: {
          id: 3,
        },
      }
    );
  }
  if (product.id == 3) {
    await product.addOrder(1, {
      through: { quantity: 1, totalPrice: product.price },
    });
    const cart = await Order.findByPk(1);
    await cart.increment(
      { orderTotal: product.price },
      {
        where: {
          id: 1,
        },
      }
    );
  }
  if (product.id == 2) {
    await product.addOrder(3, {
      through: { quantity: 1, totalPrice: product.price },
    });
    const cart = await Order.findByPk(3);
    await cart.increment(
      { orderTotal: product.price },
      {
        where: {
          id: 3,
        },
      }
    );
  }
  if (product.id == 1) {
    await product.addOrder(3, {
      through: { quantity: 1, totalPrice: product.price },
    });
    const cart = await Order.findByPk(3);
    await cart.increment(
      { orderTotal: product.price },
      {
        where: {
          id: 3,
        },
      }
    );
  }
});

module.exports = Product;
