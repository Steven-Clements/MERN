/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Container, Row, Col } from "react-bootstrap";

/* ~ ~ ~ ~ ~ Component: FormContainer ~ ~ ~ ~ ~ */
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default FormContainer;
