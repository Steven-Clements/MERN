/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice'

/* ~ ~ ~ ~ ~ Admin Screen: User List ~ ~ ~ ~ ~ */
const UserListScreen = () => {
  /* - - - - - Redux Query - - - - - */
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  /* - - - - - Event Handlers - - - - - */
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        toast.success('User removed');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <h1>Users</h1>
      { isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}> 
                  {user.email}
                </a>
                </td>
                <td>{user.isAdmin ? <FaCheck style={{ color: 'green' }} /> :         <FaTimes style={{ color: 'red' }} />
                }</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                    <FaTrash style={{ color: 'white' }}/>
                  </Button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      )}
    </>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default UserListScreen
