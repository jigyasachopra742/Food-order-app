import React from "react";
import HeaderCartButton from "./Header_cart_button";
import './Header_module.css';

const Header = (props) => {
    return(
        <>
            <header className="header">
                <h1>MEALS</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className="main-image">
                <img src="https://thumbs.dreamstime.com/z/various-asian-meals-rustic-background-top-view-place-text-food-concept-92058626.jpg" alt="FOOD KI PIC"/>  
            </div>
        </>
    );
};

export default Header
