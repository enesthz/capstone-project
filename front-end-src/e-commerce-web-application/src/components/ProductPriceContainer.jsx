import React from 'react';
import styled from 'styled-components';
import StyledButton from './StyledButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NonStlyedProductPriceContainer({
  className,
  productPrice,
  productStock,
  productId,
  userId,
}) {
  const isInStock = productStock > 0;
  let navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    if (isInStock) {
      axios
        .post(
          `http://localhost:3004/carts/items`,
          {
            userId: userId,
            productId: productId,
            quantity: 1,
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401 || error.response.status === 403) {
            navigate('/welcome');
          }
        });
    }
  }

  return (
    <div className={className}>
      ₺{productPrice}
      <p id='shippingInfo'>Ships in 3 days</p>
      <StyledButton
        onClick={handleClick}
        color={isInStock ? 'white' : 'black'}
        bgColor={isInStock ? '#2F7624' : '#CFCFCF'}>
        {isInStock ? 'Add To Cart' : 'Not In the Stocks'}
      </StyledButton>
    </div>
  );
}

const ProductPriceContainer = styled(NonStlyedProductPriceContainer)`
  display: flex;
  flex-direction: column;
  font-size: 48px;
  font-family: 'Kodchasan';
  font-weight: bold;
  align-items: center;
  gap: 20px;
  & #shippingInfo {
    font-size: 24px;
  }
`;

export default ProductPriceContainer;
