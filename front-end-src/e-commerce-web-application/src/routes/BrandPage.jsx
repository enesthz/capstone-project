import React from 'react';
import styled from 'styled-components';
import PrivateRoute from './PrivateRoute';
import { GlobalStyle } from '../App';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryPagination from '../components/CategoryPagination';

function NonStyledBrandPage({ className }) {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { brandId } = useParams();

  useEffect(function getProducts() {
    axios
      .post(
        `http://localhost:3001/products/get`,
        {
          filters: {
            brands: [brandId],
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }, []);

  return (
    <PrivateRoute>
      {product !== null ? (
        <div className={className}>
          <GlobalStyle />
          <Header />
          {product.length !== 0 ? (
            <div id='content'>
              <p>
                All <span id='brandName'>{state.brandName}</span> products:
              </p>
              <CategoryPagination products={product} totalPageItemNumber={9} />
            </div>
          ) : (
            <div id='content'>
              <p>
                There is not any <span id='brandName'>{state.brandName}</span> products
              </p>
            </div>
          )}
          <Footer />
        </div>
      ) : (
        false
      )}
    </PrivateRoute>
  );
}

const BrandPage = styled(NonStyledBrandPage)`
  display: flex;
  flex-direction: column;

  #content {
    min-height: 52vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
    gap: 20px;
  }

  #content p {
    font-family: 'Kodchasan';
    font-size: 25px;
    color: #112d4e;
  }

  #content p #brandName {
    font-weight: bold;
    color: #3f72af;
  }
`;
export default BrandPage;
