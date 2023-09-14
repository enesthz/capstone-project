import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledLink from './StyledLink';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NonStyledHomeProductImageContainer({ className, productId }) {
  const [product, setProduct] = useState(null);

  let navigate = useNavigate();

  useEffect(function getProduct() {
    axios
      .get(`http://localhost:3001/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }, []);

  return product !== null ? (
    <StyledLink to={`/product/${productId}`}>
      <div className={className}>
        <img src={product.signedImageURLs[0]} alt='product' />
        <div id='productTitle'>{product.title}</div>
      </div>
    </StyledLink>
  ) : (
    false
  );
}

const HomeProductImageContainer = styled(NonStyledHomeProductImageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 246px;
  height: 306px;
  border-style: solid;
  border-width: 2px;
  border-radius: 34px;
  border-color: #3f72af;
  gap: 23px;
  overflow: hidden;
  background-color: white;
  justify-content: center;

  & img {
    max-width: 220px;
    flex-shrink: 0;
  }

  & #productTitle {
    font-family: 'Kodchasan';
    font-size: 15px;
    text-align: center;
    height: 2em;
    color: #3f72af;
    font-weight: bold;
    overflow: hidden;
  }

  & #productTitle:hover {
    color: #112d4e;
    cursor: pointer;
  }
`;

export default HomeProductImageContainer;
