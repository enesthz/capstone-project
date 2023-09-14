import React from 'react';
import styled from 'styled-components';
import StyledLink from './StyledLink';

function NonStyledCartProductImageContainer({ className, product }) {
  return (
    <StyledLink to={`/product/${product._id}`}>
      <div className={className}>
        <img src={product.signedImageURLs[0]} alt='product' />
        <div id='productTitle'>{product.title}</div>
      </div>
    </StyledLink>
  );
}

const CartProductImageContainer = styled(NonStyledCartProductImageContainer)`
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

export default CartProductImageContainer;
