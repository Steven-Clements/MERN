/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import express from 'express';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { addOrderItems, getUserOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authHandler.js';

/* ~ ~ ~ ~ ~ Initialize Router ~ ~ ~ ~ ~ */
const router = express.Router();

/* ~ ~ ~ ~ ~ Basic Routes ~ ~ ~ ~ ~ */
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

router.route('/myorders')
  .get(protect, getUserOrders);

/* ~ ~ ~ ~ ~ Parameterized Routes ~ ~ ~ ~ ~ */
router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);
  

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default router;
