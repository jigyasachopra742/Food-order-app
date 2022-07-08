import React, {useContext} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import './CartModule.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
 
  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const cartItems = (
    <ul className='cart-items'>
      {cartCtx.items.map((item) => (
        <CartItem 
          key={item.id} 
          name = {item.name} 
          amount = {item.amount} 
          price = {item.price}  
          onRemove= {cartItemRemoveHandler.bind(null, item.id)}
          onAdd = {cartItemAddHandler.bind(null, item)}
        />
        ))}
    </ul>
  );
  
  
    return (
    <Modal onClose={props.onClose}>
        {cartItems}
        <div className='total'>
            <span >Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className='actions'>
            <button className='button--alt' onClick={props.onClose}>
              Close
            </button>
            {hasItems && <button className='button'>Order</button>}
        </div>
    </Modal>
  );//hasItems is here to make sure that whenever there are no items then it should not show the order button 
};

export default Cart;