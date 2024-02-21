/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { Container } from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import Header from './components/Header';
import Footer from './components/Footer';

/* ~ ~ ~ ~ ~ SPA Structure ~ ~ ~ ~ ~ */
const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default App
