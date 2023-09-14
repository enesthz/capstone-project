import React from 'react';
import styled from 'styled-components';
import StyledButton from './StyledButton';
import { useNavigate } from 'react-router-dom';

function NonStyledCartSummary({ className, cart }) {
  const navigate = useNavigate();

  const productTitleList = cart.cartItems.map((cartItem, index) => {
    return <div key={index}>{cartItem.product.title}</div>;
  });

  const cartQuantityList = cart.cartItems.map((cartItem, index) => {
    return <div key={index}>x{cartItem.quantity}</div>;
  });

  const productPriceList = cart.cartItems.map((cartItem, index) => {
    return <div key={index}>₺{cartItem.product.price}</div>;
  });

  const prices = cart.cartItems.map((cartItem) => {
    return cartItem.product.price * cartItem.quantity;
  });

  const totalPrice = prices.reduce((accumulator, price) => {
    return accumulator + price;
  });

  return (
    <div className={className}>
      <div id='summaryContainer'>
        <div id='h1'>Summary</div>
        <div className='borderBottom' id='h2_1'>
          Product name
        </div>
        <div className='borderBottom' id='h2_2'>
          Portion
        </div>
        <div className='borderBottom' id='h2_3'>
          Price
        </div>
        <div className='borderBottom' id='products'>
          {productTitleList}
        </div>
        <div className='borderBottom' id='portions'>
          {cartQuantityList}
        </div>
        <div className='borderBottom' id='prices'>
          {productPriceList}
        </div>
        <div id='total'>Total: ₺{totalPrice}</div>
        <div id='continue'>
          <StyledButton bgColor='#3F72AF' color='white' onClick={() => navigate('/payment')}>
            Continue
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

const CartSummary = styled(NonStyledCartSummary)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Kodchasan';
  font-size: 16px;

  #continue {
    grid-area: continue;
    padding-bottom: 16px;
  }

  .borderBottom {
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
  }

  #summaryContainer > div {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
  }

  #summaryContainer {
    background-color: white;
    border: 1px solid #3f72af;
    border-radius: 23px;
    display: inline-grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 13em auto auto auto;
    grid-template-areas:
      'h1 . .'
      'h2_1 h2_2 h2_3'
      'products portions prices'
      'products portions prices'
      'total . continue';
  }

  #h1 {
    grid-area: h1;
    color: #112d4e;
    font-weight: bold;
  }

  #h2_1 {
    grid-area: h2_1;
  }

  #h2_2 {
    grid-area: h2_2;
  }

  #h2_3 {
    grid-area: h2_3;
  }

  #products {
    grid-area: products;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  #products > div {
    margin-bottom: 20px;
    height: 2em;
    overflow: hidden;
  }

  #portions > div {
    margin-bottom: 20px;
    height: 2em;
  }

  #prices > div {
    margin-bottom: 20px;
    height: 2em;
  }

  #portions {
    grid-area: portions;
    display: flex;
    flex-direction: column;
  }

  #prices {
    grid-area: prices;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  #total {
    grid-area: total;
    padding-bottom: 16px;
    align-self: center;
    font-weight: bold;
  }
`;
export default CartSummary;
