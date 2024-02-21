/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"

/* ~ ~ ~ ~ ~ Component: SearchBox ~ ~ ~ ~ ~ */
const SearchBox = () => {
  /* - - - - - Initialize Hooks - - - - - */
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  
  /* - - - - - Manage State - - - - - */
  const [keyword, setKeyword] = useState(urlKeyword || '');

  /* - - - - - Event Handlers - - - - - */
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  }

  /* - - - - - Return JSX Markup - - - - - */
  return (
    <Form onSubmit={ submitHandler }>
      <div className="d-flex">
        <Form.Control
          type="text"
          name="q"
          value={keyword}
          onChange={ (e) => setKeyword(e.target.value) }
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button
          type="submit"
          variant="outline-light"
          className="p-2 mx-2"
        >Search</Button>
      </div>
    </Form>
  );
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default SearchBox
