/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import bcrypt from 'bcryptjs';

/* ~ ~ ~ ~ ~ User Data ~ ~ ~ ~ ~ */
const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 11),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 11),
    isAdmin: false
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 11),
    isAdmin: false
  }
];

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default users;
