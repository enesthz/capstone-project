import React from 'react';
import styled from 'styled-components';
import CartProductImageContainer from './CartProductImageContainer';

function NonStyledCategoryPaginationPageItemContainer({ className, product }) {
  return (
    <div className={className}>
      <CartProductImageContainer product={product}></CartProductImageContainer>
      <div id='price'>₺{product.price}</div>
    </div>
  );
}

const CategoryPaginationPageItemContainer = styled(NonStyledCategoryPaginationPageItemContainer)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  #price {
    font-family: 'Kodchasan';
    font-weight: bold;
    font-size: larger;
    color: #112d4e;
  }
`;
export default CategoryPaginationPageItemContainer;
