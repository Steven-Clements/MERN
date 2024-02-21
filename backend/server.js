/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import express from 'express';
import env from 'dotenv';
import cookie from 'cookie-parser';
import path from 'path';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import connect from './connect.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

/* ~ ~ ~ ~ ~ Initialize Server Assets ~ ~ ~ ~ ~ */
env.config();
connect();

/* ~ ~ ~ ~ ~ Global Variables ~ ~ ~ ~ ~ */
const port = process.env.PORT || 5000;

/* ~ ~ ~ ~ ~ Initialize Express ~ ~ ~ ~ ~ */
const app = express();

/* ~ ~ ~ ~ ~ Body Parser ~ ~ ~ ~ ~ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ~ ~ ~ ~ ~ Middleware ~ ~ ~ ~ ~ */
app.use(cookie());

/* ~ ~ ~ ~ ~ Testing Route ~ ~ ~ ~ ~ */
app.get('/', (req, res) => {
  res.send('API is running...'.bgWhite.green.bold);
});

/* ~ ~ ~ ~ ~ Routes ~ ~ ~ ~ ~ */
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);

/* ~ ~ ~ ~ ~ External Routes ~ ~ ~ ~ ~ */
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_ID })
);

/* ~ ~ ~ ~ ~ Static Assets ~ ~ ~ ~ ~ */
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

/* ~ ~ ~ ~ ~ Custom Middleware ~ ~ ~ ~ ~ */
app.use(notFound);
app.use(errorHandler);

/* ~ ~ ~ ~ ~ Start Server ~ ~ ~ ~ ~ */
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
