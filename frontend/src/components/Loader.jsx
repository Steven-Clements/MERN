/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Spinner } from 'react-bootstrap';

/* ~ ~ ~ ~ ~ Component: Loader ~ ~ ~ ~ ~ */
const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block'
      }}
    ></Spinner>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default Loader
