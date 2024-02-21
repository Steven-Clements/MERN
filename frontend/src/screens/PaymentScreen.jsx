/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import FormContainer from '../components/FormContainer.jsx';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { savePaymentMethod } from '../slices/cartSlice.js';

/* ~ ~ ~ ~ ~ Screen: Payment ~ ~ ~ ~ ~ */
const PaymentScreen = () => {
  /* - - - - - Component State - - - - - */
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  /* ~ ~ ~ ~ ~ Initialize Hooks ~ ~ ~ ~ ~ */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  /* - - - - - Component Effect - - - - - */
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  /* - - - - - Event Handlers - - - - - */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>

      <Form onSubmit={ submitHandler }>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default PaymentScreen
