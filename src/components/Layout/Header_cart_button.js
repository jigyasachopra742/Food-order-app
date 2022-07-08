import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import './Header_cart_button.css';

const HeaderCartButton = (props) => {
    
    const cartCtx = useContext(CartContext); //to get access to CartContext which is managed by the provider 

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);


    //For adding Cart Items we need to go to the CartProvider.js file
    return (
        <button className="button" onClick={props.onClick}>
            <span className="icon">

            </span>
            <span>Your Cart</span>
            <span className="badge">{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;