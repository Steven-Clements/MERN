/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";
import Order from '../models/OrderModel.js';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

/**
 * @desc    Create a new order
 * @route   POST   /api/v1/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

/**
 * @desc    Get user orders
 * @route   GET   /api/v1/orders/myorders
 * @access  Private
 */
const getUserOrders = asyncHandler(async (req, res) => {
  /* - - - - - Get user orders - - - - - */
  const orders = await Order.find({ user: req.user._id });

  /* - - - - - Send the response - - - - - */
  res.status(200).json(orders);
});

/**
 * @desc    Get order by ID
 * @route   GET   /api/v1/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  /* - - - - - Get order by ID - - - - - */
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  /* - - - - - Validation - - - - - */
  if (order) {
    /* - - - - - Send the response - - - - - */
    res.status(200).json(order);
  } else {
    /* - - - - - Throw a 404 error - - - - - */
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @desc    Update order to paid
 * @route   PUT   /api/v1/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @desc    Update order to delivered
 * @route   PUT   /api/v1/orders/:id/deliver
 * @access  Private | Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  /* - - - - - Get order by ID - - - - - */
  const order = await Order.findById(req.params.id);

  /* - - - - - Validation - - - - - */
  if (order) {
    /* - - - - - Update the order - - - - - */
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    /* - - - - - Save the order - - - - - */
    const updatedOrder = await order.save();

    /* - - - - - Send the response - - - - - */
    res.status(200).json(updatedOrder);
  } else {
    /* - - - - - Throw a 404 error - - - - - */
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @desc    Get all orders
 * @route   GET   /api/v1/orders
 * @access  Private | Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  /* - - - - - Get user orders - - - - - */
  const orders = await Order.find().populate('user', 'id name');

  /* - - - - - Send the response - - - - - */
  res.status(200).json(orders);
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export { addOrderItems, getUserOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };
