/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import jwt from 'jsonwebtoken';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

/* ~ ~ ~ ~ ~ Protect Routes ~ ~ ~ ~ ~ */
const protect = asyncHandler(async (req, res, next) => {
  /* - - - - - Variables - - - - - */
  let token;

  /* - - - - - Read JWT from HTTP cookie - - - - - */
  token = req.cookies.jwt;

  if (token) {
    try {
      /* - - - - - Verify token - - - - - */
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /* - - - - - Set user - - - - - */
      req.user = await User.findById(decoded.userId).select('-password');

      /* - - - - - Call next middleware - - - - - */
      next();
    } catch (error) {
      /* - - - - - Thrown 401 error - - - - - */
      res.status(401);
      throw new Error('Invalid token.');
    }
  } else {
    /* - - - - - Thrown 401 error - - - - - */
    res.status(401);
    throw new Error('No authorization token found.');
  }
});

/* ~ ~ ~ ~ ~ Protect Admin Routes ~ ~ ~ ~ ~ */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin.');
  }
};

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export { protect, admin };
