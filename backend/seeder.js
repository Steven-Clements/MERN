/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import dotenv from 'dotenv';
import 'colors';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import connect from './connect.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';

/* ~ ~ ~ ~ ~ Initialize Server Assets ~ ~ ~ ~ ~ */
dotenv.config();
connect();

/* ~ ~ ~ ~ ~ Seed Database ~ ~ ~ ~ ~ */
const importData = async () => {
  try {
    /* - - - - - Clear Database - - - - - */
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    /* - - - - - Insert Users - - - - - */
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    /* - - - - - Insert Products - - - - - */
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    /* - - - - - Log Success - - - - - */
    console.log('Database seeder successfully imported data...'.bgWhite.yellow.bold);

    /* - - - - - Exit Process - - - - - */
    process.exit();
  } catch (error) {
    /* - - - - - Log Error - - - - - */
    console.error(`Error: ${error.message}`.bgWhite.magenta.bold);

    /* - - - - - Exit Process - - - - - */
    process.exit(1);
  }
};

/* ~ ~ ~ ~ ~ Destroy Database ~ ~ ~ ~ ~ */
const destroyData = async () => {
  try {
    /* - - - - - Clear Database - - - - - */
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    /* - - - - - Log Success - - - - - */
    console.log('Database seeder successfully destroyed data...'.bgWhite.yellow.bold);

    /* - - - - - Exit Process - - - - - */
    process.exit();
  } catch (error) {
    /* - - - - - Log Error - - - - - */
    console.error(`Error: ${error.message}`.bgWhite.magenta.bold);

    /* - - - - - Exit Process - - - - - */
    process.exit(1);
  }
};

/* ~ ~ ~ ~ ~ Run Seeder ~ ~ ~ ~ ~ */
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

/* ~ ~ ~ ~ ~ End of File ~ ~ ~ ~ ~ */
