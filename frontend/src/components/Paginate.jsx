/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* ~ ~ ~ ~ ~ Component: Paginate ~ ~ ~ ~ ~ */
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  /* - - - - - Return JSX Markup - - - - - */
  return pages > 1 && (
    <Pagination>
      { [...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      )) }
    </Pagination>
  );
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default Paginate;
