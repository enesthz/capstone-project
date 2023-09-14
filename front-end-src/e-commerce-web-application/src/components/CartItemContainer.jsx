import styled from 'styled-components';
import CartItem from './CartItem';

function NonStyledCartItemContainer({ className, cart }) {
  let cartItems = cart.cartItems.map((cartItem, index) => {
    return (
      <CartItem
        product={cartItem.product}
        quantity={cartItem.quantity}
        key={index}
        bgColor={index % 2 === 1 ? '#DBE2EF' : 'white'}></CartItem>
    );
  });
  return <div className={className}>{cartItems}</div>;
}

const CartItemContainer = styled(NonStyledCartItemContainer)`
  grid-area: cartItems;
  display: flex;
  flex-direction: column;
`;
export default CartItemContainer;
