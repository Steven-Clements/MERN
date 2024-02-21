/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

/* ~ ~ ~ ~ ~ Assets ~ ~ ~ ~ ~ */
import logo from '../assets/logo.png'

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import SearchBox from './SearchBox';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { resetCart } from '../slices/cartSlice';
import { logout } from '../slices/authSlice';

/* ~ ~ ~ ~ ~ Component: Header ~ ~ ~ ~ ~ */
const Header = () => {
  /* - - - - - Redux State - - - - - */
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  /* - - - - - Initialize Hooks - - - - - */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ logoutApiCall ] = useLogoutMutation();

  /* - - - - - Event Handlers - - - - - */
  const logoutHandler = () => {
    try {
      logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='Clementine Solutions Logo' id='brand-logo'/>
              Clementine Solutions
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />

              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{marginLeft: '5px'}}>{ cartItems.reduce((a, c) => a + c.qty, 0) }</Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminMenu'>
                  <LinkContainer to='/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default Header
