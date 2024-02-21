/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import { useGetProductsQuery } from '../slices/productsApiSlice';

/* ~ ~ ~ ~ ~ Screen: Home ~ ~ ~ ~ ~ */
const HomeScreen = () => {
  /* - - - - - Manage State - - - - - */
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <>
      {!keyword ? (
        <>
          <h1>Featured Products</h1>
          <ProductCarousel /> 
        </>
      ) : ( <Link to='/' className='btn btn-light mb-4'>Go Back</Link> )}

      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          { error.data.message || error.error }
        </Message>
      ) : (
        <>
          <h2>Products</h2>
          <Row>
            { data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
              </Col>
            )) }
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      ) }
    </>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default HomeScreen
