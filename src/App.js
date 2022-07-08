import React from 'react';
import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() 
{
  const [cartIsShown, setCartIsShown] = useState(false);
  
  const showCartHandler = () =>
  {
    setCartIsShown(true);
  };

  const hideCartHandler = () =>{
    setCartIsShown(false);
  };
  
  return ( //Cart needs access to context to render the card items and edit them later
  //Header needs access to cart to change it's badge in header button(no of card items) 
  //Meals need access to cartContext because there we wanna add items to Cart
  //With CartProvider we provide context to all the components
    <CartProvider> 
        {cartIsShown && <Cart onClose={hideCartHandler}/>}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
    </CartProvider>
  );
}

export default App;
