import React from 'react';
import styled from 'styled-components';
import StyledLink from './StyledLink';

function NonStyledSearchProductImageContainer({ className, product }) {
  return (
    <StyledLink to={`/product/${product._id}`}>
      <div className={className}>
        <img src={product.signedImageURLs[0]} alt='product' />
      </div>
    </StyledLink>
  );
}

const SearchProductImageContainer = styled(NonStyledSearchProductImageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 246px;
  height: 306px;
  border-style: solid;
  border-width: 2px;
  border-radius: 34px;
  border-color: #3f72af;
  gap: 23px;
  overflow: hidden;
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  & img {
    width: 80%;
    height: 216px;
    flex-shrink: 0;
  }
`;

export default SearchProductImageContainer;
