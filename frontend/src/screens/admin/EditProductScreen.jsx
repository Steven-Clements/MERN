/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';

/* ~ ~ ~ ~ ~ Admin Screen: Edit Product ~ ~ ~ ~ ~ */
const EditProductScreen = () => {
  /* - - - - - Component State - - - - - */
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  /* - - - - - Redux State - - - - - */
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  /* - - - - - Initialize Hooks - - - - - */
  const navigate = useNavigate();

  /* - - - - - Component Effect - - - - - */
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  /* - - - - - Event Handlers - - - - - */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('Product updated');
      refetch();
      navigate('/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <>
      <Link to='/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        { loadingUpdate && <Loader /> }
        { loadingUpload && <Loader /> }

        { isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message> : (
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
            <Form.Group controlId='price'  className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'  className='my-3'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' placeholder='Enter image URL' value={image} onChange={(e) => setImage} />
              <Form.Control type='file' label='Choose file' onChange={uploadFileHandler} />
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'  className='my-3'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category'  className='my-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'  className='my-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
export default EditProductScreen
