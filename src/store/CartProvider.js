import React from 'react';
import CartContext from './cart-context';
import { useReducer } from 'react';
//Cart Provider component to wrap all the components that need access to context cart
const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD')
    {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id); //findIndex() is from JS which is used to find the index of that element
        
        const existingCartItem = state.items[existingCartItemIndex];
   
        let updatedItems;

        if(existingCartItem){ //IF THAT ITEM IS ALREADY IN THE CART

          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
          };

          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
         
          updatedItems = state.items.concat(action.item); //concat adds new items to an array, push edits the existing array but add returns a new array
        }

     
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'REMOVE')
    {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      
      if(existingItem.amount === 1) //last item of that type in the cart, we will remove the entire array from the Cart
      {
        updatedItems = state.items.filter(item => item.id !== action.id); //filter returns a new array 
      } //!== returns that items are kept else removed

      else{ //else we want to keep the item in the array, but we want to decrease the amount
        const updatedItem = {...existingItem, amount: existingItem.amount - 1};
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return{
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    }
    return defaultCartState;
};


const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const cartContext = { //this will be updated over time //this is an object
    items: cartState.items,              //DYNAMIC DATA BECUASE IT IS CHANGING
    totalAmount: cartState.totalAmount, //gets updated over time
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  //Provider will provide this value(cartContext: contains all the dynamic data that can be provided to further components) to all the components who need access to CartContext
  return <CartContext.Provider value={cartContext}> 
    {props.children} 
  </CartContext.Provider> //here cartContext object is passed as a value to CartContext Provider
};//props.children allows us to wrap any component that should get access to this context with the provider

export default CartProvider;
//cart context data management
//main task is to manage the card context data and provide context to all the components who want access to it