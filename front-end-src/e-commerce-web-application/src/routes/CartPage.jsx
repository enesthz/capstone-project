import React, { createContext, useEffect, useState } from 'react';
import { GlobalStyle } from '../App';
import styled from 'styled-components';
import CartItemContainer from '../components/CartItemContainer';
import axios from 'axios';
import CartSummary from '../components/CartSummary';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { selectUserId } from '../redux/slices/userIdSlice';
import PrivateRoute from './PrivateRoute';

const EmptyCartOrCartError = styled.div`
  display: flex;
  flex-direction: column;
  #content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 63vh;
    font-family: 'Kodchasan';
    font-size: 30px;
  }
`;

function useForceUpdate() {
  const [value, setValue] = useState(false);
  return [value, () => setValue(!value)];
}

export const ForceUpdateContext = createContext();
export const UserIdContext = createContext();

function NonStyledCartPage({ className }) {
  const userId = useSelector(selectUserId);
  let [forceUpdateIndicator, forceUpdate] = useForceUpdate();
  const [cart, setCart] = useState(false);
  let navigate = useNavigate();
  useEffect(
    function getCart() {
      let active = true;
      axios
        .get(`http://localhost:3004/carts/users/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          console.log(response);
          if (active) {
            setCart(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401 || error.response.status === 403) {
            navigate('/welcome');
          }
        });

      return () => {
        active = false; //for race conditions
      };
    },
    [forceUpdateIndicator],
  );

  if (cart && cart.cartItems.length === 0) {
    return (
      <EmptyCartOrCartError>
        <GlobalStyle></GlobalStyle>
        <Header />
        <div id='content'>Your Cart is Empty</div>
        <Footer />
      </EmptyCartOrCartError>
    );
  }

  return (
    <PrivateRoute>
      {cart ? (
        <UserIdContext.Provider value={userId}>
          <ForceUpdateContext.Provider value={forceUpdate}>
            <div className={className}>
              <GlobalStyle></GlobalStyle>
              <div id='headerContainer'>
                <Header></Header>
              </div>
              <div id='cartItems'>
                <CartItemContainer cart={cart} forceUpdate={forceUpdate}></CartItemContainer>
              </div>
              <div id='cartSummary'>
                <CartSummary cart={cart}></CartSummary>
              </div>
              <div id='footer'>
                <Footer></Footer>
              </div>
            </div>
          </ForceUpdateContext.Provider>
        </UserIdContext.Provider>
      ) : (
        <EmptyCartOrCartError>
          <GlobalStyle></GlobalStyle>
          <Header />
          <div id='content'>Your cart couldn't be find</div>
          <Footer />
        </EmptyCartOrCartError>
      )}
      ;
    </PrivateRoute>
  );
}

const CartPage = styled(NonStyledCartPage)`
  #headerContainer {
    grid-area: header;
  }

  #footer {
    grid-area: footer;
  }

  #cartSummary {
    grid-area: cartSummary;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #cartItems {
    grid-area: cartItems;
  }

  display: grid;
  grid-template-rows: 142px auto 215px;
  grid-template-columns: 55% 45%;
  height: 100vh;
  grid-template-areas:
    'header header'
    'cartItems cartSummary'
    'footer footer';
`;

export default CartPage;
