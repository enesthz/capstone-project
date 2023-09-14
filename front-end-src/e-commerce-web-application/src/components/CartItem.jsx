import React, { useContext } from 'react';
import styled from 'styled-components';
import CartProductImageContainer from './CartProductImageContainer';
import axios from 'axios';
import { ForceUpdateContext, UserIdContext } from '../routes/CartPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function NonStyledCartItem({ className, product, quantity }) {
  const forceUpdate = useContext(ForceUpdateContext);
  const userId = useContext(UserIdContext);
  let navigate = useNavigate();

  let optionValues = [1, 2, 3, 4, 5];
  let optionList = optionValues.map((value, index) => {
    if (value === quantity) {
      return (
        <option value={value} key={index} selected>
          {value}
        </option>
      );
    } else {
      return (
        <option key={index} value={value}>
          {value}
        </option>
      );
    }
  });

  function handleSelectChange(event) {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:3004/carts/items/${product._id}`,
        {
          userId: userId,
          quantity: event.target.value,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )
      .then((response) => {
        console.log(response);
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }

  function handleXMarkClick(event) {
    event.preventDefault();
    console.log(product._id);
    axios
      .delete(`http://localhost:3004/carts/items/${product._id}`, {
        data: { userId: userId },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log(response.data);
        forceUpdate();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }

  return product ? (
    <div className={className}>
      <CartProductImageContainer product={product}></CartProductImageContainer>
      <p>Unit Price: ₺{product.price}</p>
      <select name='quantity' onChange={handleSelectChange}>
        {optionList}
      </select>
      <div onClick={handleXMarkClick}>
        <FontAwesomeIcon icon={faXmark} size='xl'></FontAwesomeIcon>
      </div>
    </div>
  ) : (
    false
  );
}

const CartItem = styled(NonStyledCartItem)`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  padding: 20px 20px;
  font-family: 'Kodchasan';
  font-size: 16px;
  color: #112d4e;
  font-weight: bold;
  overflow: hidden;

  p {
    margin-left: 25px;
  }

  select {
    margin-left: 20px;
  }
`;
export default CartItem;
