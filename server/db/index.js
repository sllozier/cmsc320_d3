// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");
//Import models here
const Customer = require("./models/Customer")
const Product = require('./models/Product')
const Resource = require('./models/Resource')
const Supplier = require('./models/Supplier')
const Order = require('./models/Order')
const LineItem = require('./models/LineItem')
//associations

Supplier.hasMany(Product, {
  foreignKey: "supplierId", // Foreign key in the Product model
  as: "products",
});
Product.belongsTo(Supplier, {
  foreignKey: "supplierId",
  as: "supplier",
});

Supplier.hasMany(Resource, {
  foreignKey: "supplierId", // Foreign key in the Resource model
  as: "resources",
});
Resource.belongsTo(Supplier, {
  foreignKey: "supplierId",
  as: "supplier",
});

// Customer can order many products
//Customer.belongsToMany(Product, {
//  through: Order,
//  foreignKey: "customerId",
//  as: "orders",
//});

// Products can be ordered by many customers
//Product.belongsToMany(Customer, {
//  through: Order,
//  foreignKey: "productId",
//  as: "customers",
//});

Order.belongsTo(Customer);
Customer.hasMany(Order);

Product.belongsToMany(Order, { through: LineItem });
Order.belongsToMany(Product, { through: LineItem });


module.exports = {
  db,
  Customer,
  Product,
  Resource,
  Supplier,
  Order,
};
