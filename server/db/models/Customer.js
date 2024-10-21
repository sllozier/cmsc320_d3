const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT = process.env.TOKEN;

const SALT_ROUNDS = 5;

const Customer = db.define("account", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

//AUTH

Customer.prototype.comparePassword = function (pswd) {
  return bcrypt.compare(pswd, this.password);
};

Customer.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

Customer.byToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, JWT);
    const customer = Customer.findByPk(id);
    if (!customer) {
      throw "nooo";
    }
    return customer;
  } catch {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

Customer.authenticate = async function ({ username, password }) {
  const customer = await Customer.findOne({
    where: {
      username,
    },
  });
  if (!customer || !(await customer.comparePassword(password))) {
    const error = Error("Incorrect username or password");
    error.status = 401;
    throw error;
  }
  return customer.generateToken();
};

const hashPassword = async function (customer) {
  if (customer.changed("password")) {
    customer.password = await bcrypt.hash(customer.password, SALT_ROUNDS);
  }
};

Customer.beforeCreate(hashPassword);
Customer.beforeUpdate(hashPassword);
Customer.beforeBulkCreate((customers) => Promise.all(customers.map(hashPassword)));

module.exports = Customer;
