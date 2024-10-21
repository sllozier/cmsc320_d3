

//require db and any models
const { db, Customer, Product, Resource, Supplier, Order, LineItem } = require("./");


//require and data files to use in seeding

const getPeoples = require('./peoples')
const getSuppliers = require('./suppliers')
const { products } = require("./products.json")
const { resources } = require("./resources.json")

const seed = async () => {
  try {
    console.log(`Seeding started...`);
    await db.sync({ force: true });

  // CUSTOMER
     const customerData = await getPeoples();
     const customers = await Promise.all(
       customerData.map((customer) => Customer.create(customer))
     );

     const customer = await Customer.create({
      firstName: "Peep",
      lastName: "User",
      username: "user",
      password: "password",
      email: "peepUser@email.com",
    });

    // SUPPLIER

    const supplierData = await getSuppliers();
    const suppliers = await Promise.all(
      supplierData.map((supplier) => Supplier.create(supplier))
    );

    const supplier = await Supplier.create({
      name: "Peep Supplier Inc",
      contactName: "Sup",
      username: "supplier",
      password: "password",
      email: "peepSupplier@email.com",
      address: "123 Peep Lane"
    });

    // PRODUCTS
   const product = await Product.bulkCreate(products)

    // RESOURCES
    const resource = await Resource.bulkCreate(resources)

    // ORDERS
    const order1 = await Order.create({
      accountId: 1,
      purchaseDate: new Date(),
    });

    const order2 = await Order.create({
      accountId: 2,
      purchaseDate: new Date(),
    });

    const order3 = await Order.create({
      accountId: 5,
      purchaseDate: new Date(),
    });

    console.log(
      `Seeding successful!`
      //" Special Methods Check :", Object.keys("Model".prototype),
    );
  } catch (error) {
    console.log(`Seeding Problem! Error in seed Function: ${error}`);
  }
};
const runSeed = async () => {
  console.log(`Start seeding...`);
  try {
    await seed();
  } catch (error) {
    console.error("RUN SEED ERROR", error);
    process.exitCode = 1;
  } finally {
    console.log(`closing db connection`);
    await db.close();
    console.log(`db connection closed`);
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = seed;
