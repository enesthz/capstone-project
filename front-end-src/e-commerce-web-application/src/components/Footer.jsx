import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

const StyledLogo = styled(Logo)`
  position: relative;
`;

export default function NonStyledFooter({ className }) {
  return (
    <div className={className}>
      <div id='logo'>
        <StyledLogo />
      </div>
      {/* Change the <p> tags to Link Component  */}
      <div id='categories'>
        <p className='Header'>Popular Categories</p>
        <p className='Items'>Phone</p>
        <p className='Items'>Computer</p>
        <p className='Items'>Gaming</p>
        <p className='Items'>Health</p>
        <p className='Items'>Home Devices</p>
        <p className='Items'>Accessories</p>
      </div>
      <div id='products'>
        <p className='Header'>Popular Products</p>
        <p className='Items'>IPhone 14</p>
        <p className='Items'>Apple Macbook Air M1...</p>
        <p className='Items'>MSI RTX 3080TI</p>
        <p className='Items'>Samsung Galaxy Watch 5</p>
      </div>
      <div id='brands'>
        <p className='Header'>Popular Brands</p>
        <p className='Items'>Apple</p>
        <p className='Items'>Samsung</p>
        <p className='Items'>Siemens</p>
        <p className='Items'>Xiaomi</p>
      </div>
      <div id='copyright'>
        In-store pricing may vary. Prices and offers are subject to change. © 2023 ByteBuy. All
        rights reserved. ByteBuy, the ByteBuy logo, the tag design, and ByteBuy are trademarks of
        ByteBuy and its affiliated companies.
      </div>
    </div>
  );
}

export const Footer = styled(NonStyledFooter)`
  height: 215px;
  width: 100%;
  display: inline-grid;
  background-color: #a5c4e9;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'logo categories products brands'
    'copyright copyright copyright copyright';

  #logo {
    grid-area: logo;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #categories {
    grid-area: categories;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
  }

  .Header {
    font-family: 'Kodchasan';
    color: white;
    font-size: 18px;
    font-weight: bold;
  }

  .Items {
    font-family: 'Kodchasan';
    color: #3f72af;
    font-size: 16px;
    font-weight: bold;
    // padding-left: 10px;
  }

  .Items:hover {
    color: #112d4e;
  }

  #products {
    grid-area: products;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
  }

  #brands {
    grid-area: brands;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
  }

  #copyright {
    grid-area: copyright;
    font-size: 12px;
    font-family: 'Kodchasan';
    font-weight: bold;
    letter-spacing: 1.2px;
    text-align: center;
  }
`;
