import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductImageContainer from '../components/ProductImageContainer';
import ProductInfoContainer from '../components/ProductInfoContainer';
import { GlobalStyle } from '../App';
import ProductPriceContainer from '../components/ProductPriceContainer';
import ProductOverview from '../components/ProductOverview';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { selectUserId } from '../redux/slices/userIdSlice';
import PrivateRoute from './PrivateRoute';

function NonStyledProductPage({ className }) {
  const userId = useSelector(selectUserId);
  let { productId } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState(false);
  useEffect(function getProduct() {
    axios
      .get(`http://localhost:3001/products/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
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
      {product ? (
        <div className={className}>
          <GlobalStyle></GlobalStyle>
          <div id='header'>
            <Header></Header>
          </div>
          <div id='productPageContent'>
            <ProductImageContainer src={product.signedImageURLs[0]}></ProductImageContainer>
            <ProductInfoContainer product={product} userId={userId}></ProductInfoContainer>
            <ProductPriceContainer
              productId={product._id}
              productPrice={product.price}
              productStock={product.stockCount}
              userId={userId}></ProductPriceContainer>
          </div>
          <div id='overview'>
            <ProductOverview product={product}></ProductOverview>
          </div>
          <div id='footer'>
            <Footer></Footer>
          </div>
        </div>
      ) : (
        false
      )}
    </PrivateRoute>
  );
}

const ProductPage = styled(NonStyledProductPage)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
    'header'
    'content'
    'overview'
    'footer';

  #productPageContent {
    grid-area: content;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  #overview {
    display: flex;
    justify-content: center;
  }

  #footer {
    grid-area: footer;
    margin-top: 20px;
  }
`;
export default ProductPage;
