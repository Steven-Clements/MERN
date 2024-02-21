/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import jwt from 'jsonwebtoken';

/* ~ ~ ~ ~ ~ Generate Token ~ ~ ~ ~ ~ */
const generateToken = (res, userId) => {
  /* - - - - - Create token - - - - - */
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });

  /* - - - - - Set JWT as HTTP cookie - - - - - */
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'develop',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default generateToken;
