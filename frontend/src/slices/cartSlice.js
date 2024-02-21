/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { createSlice } from '@reduxjs/toolkit';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { updateCart } from '../utils/cartUtils.js';

/* ~ ~ ~ ~ ~ Initialize State ~ ~ ~ ~ ~ */
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

/* ~ ~ ~ ~ ~ Create Slice ~ ~ ~ ~ ~ */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      /* - - - - - Add Item to Cart - - - - - */
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);

      /* - - - - - Update Cart Items - - - - - */
      if (existItem) {
        state.cartItems = state.cartItems.map((i) => (i._id === existItem._id ? item : i));
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      /* - - - - - Remove Item from Cart - - - - - */
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      /* - - - - - Save Shipping Address - - - - - */
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      /* - - - - - Save Payment Method - - - - - */
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      /* - - - - - Clear Cart Items - - - - - */
      state.cartItems = [];
      return updateCart(state);
    },
    resetCart: (state) => ( state = initialState )
  }
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default cartSlice.reducer;
export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = cartSlice.actions;
