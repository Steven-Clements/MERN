/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/ProductModel.js';

/**
 * @desc    Fetch all products
 * @route   GET   /api/v1/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  /* - - - - - Local Variables - - - - - */
  const pageSize = process.env.PAGINATION_LIMIT;

  /* - - - - - Pagination - - - - - */
  const page = Number(req.query.pageNumber) || 1;

  /* - - - - - Search - - - - - */
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  /* - - - - - Count Products - - - - - */
  const count = await Product.countDocuments({ ...keyword });

  /* - - - - - Retrieve Products - - - - - */
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  /* - - - - - Send Response - - - - - */
  return res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

/**
 * @desc    Fetch single product
 * @route   GET   /api/v1/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  /* - - - - - Retrieve Product - - - - - */
  const product = await Product.findById(req.params.id);

  /* - - - - - Check if Product Exists - - - - - */
  if (!product) {
    res.status(404);
    throw new Error('Resource not found');
  }

  /* - - - - - Send Response - - - - - */
  return res.json(product);
});

/**
 * @desc    Get Featured Products
 * @route   GET   /api/v1/products/featured
 * @access  Public
 */
const getFeaturedProducts = asyncHandler(async (req, res) => {
  /* - - - - - Retrieve Product - - - - - */
  const featured = await Product.find({}).sort({ rating: -1 }).limit(3);

  /* - - - - - Send Response - - - - - */
  return res.json(featured);
});

/**
 * @desc    Create a new products
 * @route   POST   /api/v1/products
 * @access  Private | Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  /* - - - - - Create Product - - - - - */
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  /* - - - - - Save Product - - - - - */
  const createdProduct = await product.save();

  /* - - - - - Send Response - - - - - */
  return res.status(201).json(createdProduct);
});

/**
 * @desc    Update product by ID
 * @route   PUT   /api/v1/products/:id
 * @access  Private | Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  /* - - - - - Destructure - - - - - */
  const { name, price, description, image, brand, category, countInStock } = req.body;
  
  /* - - - - - Retrieve Product - - - - - */
  const product = await Product.findById(req.params.id);

  /* - - - - - Check if Product Exists - - - - - */
  if (!product) {
    res.status(404);
    throw new Error('Resource not found');
  }

  /* - - - - - Update Product - - - - - */
  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.countInStock = countInStock || product.countInStock;

  /* - - - - - Save Product - - - - - */
  const updatedProduct = await product.save();

  /* - - - - - Send Response - - - - - */
  return res.json(updatedProduct);
});

/**
 * @desc    Delete product by ID
 * @route   DELETE   /api/v1/products/:id
 * @access  Private | Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  /* - - - - - Retrieve Product - - - - - */
  const product = await Product.findById(req.params.id);

  /* - - - - - Check if Product Exists - - - - - */
  if (!product) {
    res.status(404);
    throw new Error('Resource not found');
  }

  /* - - - - - Delete Product - - - - - */
  await Product.deleteOne({ _id: product._id });

  /* - - - - - Send Response - - - - - */
  return res.status(200).json({ message: 'Product removed' });
});

/**
 * @desc    Create a new product review
 * @route   POST   /api/v1/products/:id/reviews
 * @access  Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  /* - - - - - Destructure - - - - - */
  const { rating, comment } = req.body;

  /* - - - - - Retrieve Product - - - - - */
  const product = await Product.findById(req.params.id);

  /* - - - - - Check if Product Exists - - - - - */
  if (product) {
    /* - - - - - Search Product for Reviews - - - - - */
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    /* - - - - - Check if Product Review Exists - - - - - */
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    /* - - - - - Create Review - - - - - */
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    /* - - - - - Add Review to Product - - - - - */
    product.reviews.push(review);

    /* - - - - - Update Product - - - - - */
    product.numReviews = product.reviews.length;

    /* - - - - - Calculate Product Rating - - - - - */
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    /* - - - - - Save Product - - - - - */
    await product.save();

    /* - - - - - Send Response - - - - - */
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export { getProducts, getProductById, getFeaturedProducts, createProduct, updateProduct, deleteProduct, createProductReview };
