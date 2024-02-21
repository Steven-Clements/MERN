/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ~ ~ ~ ~ ~ Component: PrivateRoute ~ ~ ~ ~ ~ */
const AdminRoute = () => {
  /* ~ ~ ~ ~ ~ Initialize Redux State ~ ~ ~ ~ ~ */
  const { userInfo } = useSelector((state) => state.auth);

  /* ~ ~ ~ ~ ~ Return JSX Markup ~ ~ ~ ~ ~ */
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default AdminRoute
