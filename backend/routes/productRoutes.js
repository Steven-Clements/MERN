/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import express from 'express';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { getProducts, getProductById, getFeaturedProducts, createProduct, updateProduct, deleteProduct, createProductReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';
import checkObjectId from '../middleware/objectIdHandler.js';

/* ~ ~ ~ ~ ~ Initialize Router ~ ~ ~ ~ ~ */
const router = express.Router();

/* ~ ~ ~ ~ ~ Basic Routes ~ ~ ~ ~ ~ */
router.route('/')
  .post(protect, admin, createProduct)
  .get(getProducts)

router.get('/featured', getFeaturedProducts); 

/* ~ ~ ~ ~ ~ Parameterized Routes ~ ~ ~ ~ ~ */
router.route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route('/:id/reviews')
  .post(protect, checkObjectId, createProductReview)

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default router;
