/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import Message from './Message';
import { useGetFeaturedProductsQuery } from '../slices/productsApiSlice';

/* ~ ~ ~ ~ ~ Component: ProductCarousel ~ ~ ~ ~ ~ */
const ProductCarousel = () => {
  /* - - - - - Manage State - - - - - */
  const { data: products, isLoading, error } = useGetFeaturedProductsQuery();

  /* - - - - - Return JSX Markup - - - - - */
  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default ProductCarousel
