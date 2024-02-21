/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Helmet } from 'react-helmet-async';

/* ~ ~ ~ ~ ~ Component: Meta ~ ~ ~ ~ ~ */
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Clementine Solutions',
  description: 'We sell the best products for cheap.',
  keywords: 'electronics, buy electronics, cheap electronics',
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default Meta
