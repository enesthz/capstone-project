import React from 'react';
import styled from 'styled-components';
import StyledLink from './StyledLink';

const StyledLinkExtended = styled(StyledLink)`
  display: flex;
  width: 50%;
  height: 291px;
`;
function NonStyledCampaign({ className, campaignBrandId }) {
  return (
    <StyledLinkExtended to={`/brand/${campaignBrandId}`} state={{ brandName: 'Philips' }}>
      <div className={className}>
        <div id='leftSide'>
          <p>%10 Discount for All Philips Products</p>
          <br />
          <p>10 March - 1 April</p>
        </div>
        <div id='rightSide'>
          <img
            src='https:companieslogo.com/img/orig/PHG_BIG-6c7248db.png?t=1648159494'
            alt='brand'
          />
        </div>
      </div>
    </StyledLinkExtended>
  );
}

const Campaign = styled(NonStyledCampaign)`
  display: flex;
  align-items: stretch;

  #leftSide {
    background-color: #3f72af;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Kodchasan';
    font-size: 24px;
    text-align: center;
    font-weight: bold;
  }

  #rightSide {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #112d4e;
    flex-basis: 50%;
    img {
      max-width: 70%;
    }
  }
`;
export default Campaign;
