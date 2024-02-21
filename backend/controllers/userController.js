/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from '../models/userModel.js';

/**
 * @desc    Authenticate user and get token
 * @route   POST   /api/v1/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  /* - - - - - Deconstruct - - - - - */
  const { email, password } = req.body;

  /* - - - - - Search database for user - - - - - */
  const user = await User.findOne({email});

  /* - - - - - Check if user exists - - - - - */
  if (user && (await user.matchPassword(password))) {
    /* - - - - - Generate token - - - - - */
    generateToken(res, user._id);

    /* - - - - - Send response - - - - - */
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    /* - - - - - Thrown 401 error - - - - - */
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

/**
 * @desc    Register a new user
 * @route   POST   /api/v1/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  /* - - - - - Deconstruct - - - - - */
  const { name, email, password } = req.body;

  /* - - - - - Search database for user - - - - - */
  const userExists = await User.findOne({email});

  /* - - - - - Check if user exists - - - - - */
  if (userExists) {
    /* - - - - - Thrown 400 error - - - - - */
    res.status(400);
    throw new Error('Email already in use.');
  }

  /* - - - - - Create user - - - - - */
  const user = await User.create({ 
    name,
    email,
    password
  });

  if (user) {
    /* - - - - - Generate token - - - - - */
    generateToken(res, user._id);

    /* - - - - - Send response - - - - - */
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    /* - - - - - Thrown 400 error - - - - - */
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

/**
 * @desc    Log out user and clear cookie
 * @route   POST   /api/v1/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  /* - - - - - Clear cookie - - - - - */
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  /* - - - - - Send response - - - - - */
  res.status(200).json({ message: 'Log out successful.' });
});

/**
 * @desc    Get all users
 * @route   GET   /api/v1/users
 * @access  Private | Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  /* - - - - - Search database for users - - - - - */
  const users = await User.find({});

  /* - - - - - Send response - - - - - */
  return res.status(200).json(users);
});

/**
 * @desc    Get user by ID
 * @route   GET   /api/v1/users/:id
 * @access  Private | Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  /* - - - - - Search database for user - - - - - */
  const user = await User.findById(req.params.id).select('-password');

  /* - - - - - Check if user exists - - - - - */
  if (user) {
    /* - - - - - Send response - - - - - */
    res.status(200).json(user);
  } else {
    /* - - - - - Thrown 404 error - - - - - */
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @desc    Get user profile
 * @route   GET   /api/v1/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  /* - - - - - Search database for user - - - - - */
  const user = await User.findById(req.user._id);

  /* - - - - - Check if user exists - - - - - */
  if (user) {
    /* - - - - - Send response - - - - - */
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    /* - - - - - Thrown 404 error - - - - - */
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @desc    Update user by ID
 * @route   PUT   /api/v1/users/:id
 * @access  Private | Admin
 */
const updateUserById = asyncHandler(async (req, res) => {
  /* - - - - - Search database for user - - - - - */
  const user = await User.findById(req.params.id);

  /* - - - - - Check if user exists - - - - - */
  if (user) {
    /* - - - - - Update user - - - - - */
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    /* - - - - - Save user - - - - - */
    const updatedUser = await user.save();

    /* - - - - - Send response - - - - - */
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    /* - - - - - Thrown 404 error - - - - - */
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @desc    Update user profile
 * @route   PUT   /api/v1/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  /* - - - - - Search database for user - - - - - */
  const user = await User.findById(req.user._id);

  /* - - - - - Check if user exists - - - - - */
  if (user) {
    /* - - - - - Update user - - - - - */
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    /* - - - - - Update user password - - - - - */
    if (req.body.password) {
      user.password = req.body.password;
    }

    /* - - - - - Save user - - - - - */
    const updatedUser = await user.save();

    /* - - - - - Send response - - - - - */
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    /* - - - - - Thrown 404 error - - - - - */
    res.status(404);
    throw new Error('User not found.');
  }
});

/**
 * @desc    Delete user by ID
 * @route   DELETE   /api/v1/users/:id
 * @access  Private | Admin
 */
const deleteUserById = asyncHandler(async (req, res) => {
  /* - - - - - Search database for user - - - - - */
  const user = await User.findById(req.params.id);

  if (user) {
    /* - - - - - Check if user is an admin - - - - - */
    if (user.isAdmin) {
      /* - - - - - Thrown 400 error - - - - - */
      res.status(400);
      throw new Error('Admin users cannot be deleted.');
    }

    /* - - - - - Remove user - - - - - */
    await user.deleteOne({ _id: user._id });

    /* - - - - - Send response - - - - - */
    res.status(200).json({ message: 'User removed.' });
  } else {
    /* - - - - - Thrown 404 error - - - - - */
    res.status(404);
    throw new Error('User not found.');
  }
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export { authUser, registerUser, logoutUser, getUsers, getUserById, getUserProfile, updateUserById, updateUserProfile, deleteUserById };
