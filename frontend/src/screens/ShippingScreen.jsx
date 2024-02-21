/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';
import checkoutSteps from '../components/CheckoutSteps';

/* ~ ~ ~ ~ ~ Screen: Shipping ~ ~ ~ ~ ~ */
const ShippingScreen = ({ history }) => {
  /* ~ ~ ~ ~ ~ Initialize Redux State ~ ~ ~ ~ ~ */
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  /* ~ ~ ~ ~ ~ Initialize State ~ ~ ~ ~ ~ */
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  /* ~ ~ ~ ~ ~ Initialize Hooks ~ ~ ~ ~ ~ */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ~ ~ ~ ~ ~ Event Handlers ~ ~ ~ ~ ~ */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  }

  /* ~ ~ ~ ~ ~ Return JSX Markup ~ ~ ~ ~ ~ */
  return (
    <FormContainer>
      {checkoutSteps(1, 2)}

      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className='my-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default ShippingScreen;
