import React from 'react';
import styled from 'styled-components';

function NonStyledProductImageContainer({ className, src }) {
  return (
    <div className={className}>
      <img src={src} alt='product' />
    </div>
  );
}

const ProductImageContainer = styled(NonStyledProductImageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 639px;
  height: 677px;
  & > img {
    max-width: 100%;
  }
`;

export default ProductImageContainer;
