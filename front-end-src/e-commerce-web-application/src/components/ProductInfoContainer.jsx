import React from 'react';
import styled from 'styled-components';
import StarRating from './StarRating';
import { faStar as starSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HorizontalLine = styled.div`
  border-bottom: 3px solid #112d4e;
  width: 100%;
  margin-top: 6px;
`;

function NonStyledProductInfoContainer({ className, product, userId }) {
  let category = product.category.title;

  let shortInfoKeysForData = [];
  let shortInfoKeysForUI = [];

  switch (
    category //dont forget to add other casees for categories
  ) {
    case 'Phone':
      shortInfoKeysForData = ['color', 'warranty', 'OS', 'screenSize', 'memory'];
      shortInfoKeysForUI = ['Color', 'Warranty (in years)', 'OS', 'Screen Size', 'Memory'];
      break;
    case 'Computer':
      shortInfoKeysForData = ['color', 'warranty', 'OS', 'graphicCard', 'memory'];
      shortInfoKeysForUI = ['Color', 'Warranty', 'OS', 'Graphic Card', 'Memory'];
      break;
    default:
      break;
  }

  const productShortInfo = shortInfoKeysForData.map((key) => product[key]);
  const productShortInfoList = productShortInfo.map((info, index) => (
    <p key={index}>
      {shortInfoKeysForUI[index]}: {info}
    </p>
  ));

  return (
    <div className={className}>
      <div id='title'>{product.title}</div>
      <HorizontalLine></HorizontalLine>
      <div id='ratingAndAvg'>
        <StarRating userId={userId} product={product}></StarRating>
        <div id='avgRate'>
          <p>{product.averageRate !== null ? product.averageRate.toString() + '/5' : 0}</p>
          <FontAwesomeIcon icon={starSolid} style={{ color: '#ffdf00' }} />
        </div>
      </div>
      <HorizontalLine></HorizontalLine>
      <div id='shortInfo'>
        <p>Category: {category}</p>
        {productShortInfoList}
      </div>
    </div>
  );
}

const ProductInfoContainer = styled(NonStyledProductInfoContainer)`
  display: flex;
  flex-direction: column;
  width: 500px;
  color: black;
  font-size: 24px;
  margin-left: 90px;
  font-family: 'Kodchasan';
  & #title {
    font-weight: bold;
  }
  gap: 20px;

  & #shortInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  #ratingAndAvg {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #avgRate {
    display: flex;
    gap: 3px;
  }
`;

export default ProductInfoContainer;
