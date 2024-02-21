/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/* ~ ~ ~ ~ ~ User Schema ~ ~ ~ ~ ~ */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

/* ~ ~ ~ ~ ~ Model Methods ~ ~ ~ ~ ~ */
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ~ ~ ~ ~ ~ Define Schema ~ ~ ~ ~ ~ */
const User = mongoose.model('User', userSchema);

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default User;
