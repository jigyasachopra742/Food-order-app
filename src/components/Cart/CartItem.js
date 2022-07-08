import './CartItem.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className='cart-item'>
      <div>
        <h2>{props.name}</h2>
        <div className='summaryy'>
          <span className='price'>{price}</span>
          <span className='amount'>x {props.amount}</span>
        </div>
      </div>
      <div className='actions'>
        <button className = "button1" onClick={props.onRemove}>−</button>
        <button className = "button1" onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
