/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import express from 'express';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { authUser, registerUser, logoutUser, getUsers, getUserById, getUserProfile, updateUserById, updateUserProfile, deleteUserById } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authHandler.js';

/* ~ ~ ~ ~ ~ Initialize Router ~ ~ ~ ~ ~ */
const router = express.Router();

/* ~ ~ ~ ~ ~ Basic Routes ~ ~ ~ ~ ~ */
router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);

router.post('/login', authUser);

router.post('/logout', protect, logoutUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/* ~ ~ ~ ~ ~ Parameterized Routes ~ ~ ~ ~ ~ */
router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUserById);

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default router;
