import React from 'react';
import styled from 'styled-components';
import topProducts from '../helpers/topProducts';
import HomeProductImageContainer from './HomeProductImageContainer';

function NonStyledTopSellers({ className }) {
  let topSellerList = topProducts.map((product, index) => {
    return (
      <HomeProductImageContainer key={index} productId={product.id}></HomeProductImageContainer>
    );
  });
  return <div className={className}>{topSellerList}</div>;
}

const TopSellers = styled(NonStyledTopSellers)`
  display: flex;
  justify-content: space-evenly;
`;
export default TopSellers;
