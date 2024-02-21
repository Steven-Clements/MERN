/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

/* ~ ~ ~ ~ ~ Public Screens ~ ~ ~ ~ ~ */
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

/* ~ ~ ~ ~ ~ Private Screens ~ ~ ~ ~ ~ */
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

/* ~ ~ ~ ~ ~ Admin Screens ~ ~ ~ ~ ~ */
import ProductListScreen from './screens/admin/ProductListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import EditProductScreen from './screens/admin/EditProductScreen';
import store from './store';
import EditUserScreen from './screens/admin/EditUserScreen';

/* ~ ~ ~ ~ ~ React Router ~ ~ ~ ~ ~ */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path ='register' element= {<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path ='/shipping' element = {<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element= { <AdminRoute /> }>
        <Route path='/productlist' element={<ProductListScreen />} />
        <Route path='/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/userlist' element={<UserListScreen />} />
        <Route path='/orderlist' element={<OrderListScreen />} />
        <Route path='/admin/product/:id/edit' element={<EditProductScreen />} />
        <Route path='/admin/user/:id/edit' element={<EditUserScreen />} />
      </Route>
    </Route>
  )
)

/* ~ ~ ~ ~ ~ Render ~ ~ ~ ~ ~ */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider
          deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
