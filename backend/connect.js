/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import mongoose from 'mongoose';
import 'colors';

/* ~ ~ ~ ~ ~ Attempt to Connect to DB ~ ~ ~ ~ ~ */
const connect = async () => {
  try {
    /* - - - - - Connect to MongoDB - - - - - */
    const conn = await mongoose.connect(process.env.MONGO_URI);

    /* - - - - - Log Connection - - - - - */
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgWhite.green.bold);
  } catch (error) {
    /* - - - - - Log Error - - - - - */
    console.log(`Error: ${error.message}`.bgWhite.magenta.bold);

    /* - - - - - Exit Process - - - - - */
    process.exit(1);
  }
};

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default connect;
