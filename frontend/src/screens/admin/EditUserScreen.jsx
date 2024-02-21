/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';

/* ~ ~ ~ ~ ~ Admin Screen: Edit Product ~ ~ ~ ~ ~ */
const EditUserScreen = () => {
  /* - - - - - Component State - - - - - */
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  /* - - - - - Redux State - - - - - */
  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  /* - - - - - Initialize Hooks - - - - - */
  const navigate = useNavigate();

  /* - - - - - Component Effect - - - - - */
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  /* - - - - - Event Handlers - - - - - */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin
      });
      toast.success('User updated successfully');
      refetch();
      navigate('/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <>
      <Link to='/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        { loadingUpdate && <Loader /> }
        
        { isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
          <Form onSubmit={ submitHandler }>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email'  className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='isAdmin'  className='my-3'>
              <Form.Label>Set as Admin</Form.Label>
              <Form.Check type='checkbox' placeholder='Set as admin' value={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            </Form.Group>
            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        ) }
      </FormContainer>
    </>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default EditUserScreen
