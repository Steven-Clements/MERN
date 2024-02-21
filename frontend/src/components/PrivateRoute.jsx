/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ~ ~ ~ ~ ~ Component: PrivateRoute ~ ~ ~ ~ ~ */
const PrivateRoute = () => {
  /* ~ ~ ~ ~ ~ Initialize Redux State ~ ~ ~ ~ ~ */
  const { userInfo } = useSelector((state) => state.auth);

  /* ~ ~ ~ ~ ~ Return JSX Markup ~ ~ ~ ~ ~ */
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default PrivateRoute
