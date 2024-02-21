/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useAddOrderItemsMutation } from '../slices/ordersApiSlice.js';
import { clearCartItems } from '../slices/cartSlice.js';

/* ~ ~ ~ ~ ~ Screen: Place Order ~ ~ ~ ~ ~ */
const PlaceOrderScreen = () => {
  /* ~ ~ ~ ~ ~ Initialize Hooks ~ ~ ~ ~ ~ */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  /* ~ ~ ~ ~ ~ Redux Dispatch ~ ~ ~ ~ ~ */
  const [addOrderItems, { isLoading, error }] = useAddOrderItemsMutation();

  /* - - - - - Use Effect - - - - - */
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  /* - - - - - Event Handlers - - - - - */
  const placeOrderHandler = async () => {
    try {
      const res = await addOrderItems({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  }
  
  /* - - - - - Return JSX Markup - - - - - */
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <h1>Place Order</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Subtotal</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error.data.message}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler }>
                  Place Order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default PlaceOrderScreen;
