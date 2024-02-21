/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Alert } from 'react-bootstrap';

/* ~ ~ ~ ~ ~ Component: Message ~ ~ ~ ~ ~ */
const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

/* ~ ~ ~ ~ ~ Default Props ~ ~ ~ ~ ~ */
Message.defaultProps = {
  variant: 'info'
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default Message
