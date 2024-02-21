/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Container, Row, Col } from 'react-bootstrap';

/* ~ ~ ~ ~ ~ Component: Footer ~ ~ ~ ~ ~ */
const Footer = () => {
  /* - - - - - Local Variables - - - - - */
  const currentYear = new Date().getFullYear();

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Clementine Solutions &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default Footer
