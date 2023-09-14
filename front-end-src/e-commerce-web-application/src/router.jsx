import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './routes/ErrorPage';
import SignUpPage from './routes/SignUpPage';
import WelcomePage from './routes/WelcomePage';
import HomePage from './routes/HomePage';
import CartPage from './routes/CartPage';
import ProductPage from './routes/ProductPage';
import ProfilePage from './routes/ProfilePage';
import CategoryPage from './routes/CategoryPage';
import SearchPage from './routes/SearchPage';
import BrandPage from './routes/BrandPage';
import PaymentPage from './routes/PaymentPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/signUp',
    element: <SignUpPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/product/:productId',
    element: <ProductPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/categories/:categoryId',
    element: <CategoryPage></CategoryPage>,
  },
  { path: '/search', element: <SearchPage /> },
  {
    path: '/brand/:brandId',
    element: <BrandPage />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
  },
]);

export default router;
