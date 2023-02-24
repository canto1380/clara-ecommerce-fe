import React, { createContext, useReducer } from "react";
import { getCartData, setCartData } from "helpers/helpers";

export const Cart = createContext();

/** Estado inicial de carrito**/
const dataCart = getCartData();
const initialState = {
  cart: {
    cartItems: dataCart ? dataCart : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CARD_ADD_ITEM": {
      const newItem = action.payload;
      const arrayItemCart = Object.values(state.cart.cartItems);
      const existsItem = arrayItemCart.find((item) => item._id === newItem._id);
      const cartItems = existsItem
        ? arrayItemCart.map((item) =>
            item._id === existsItem._id ? newItem : item
          )
        : [...arrayItemCart, newItem];

      setCartData({ ...cartItems });
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CARD_REMOVE_ITEM": {
      // console.log(state.cart.cartItems)
      const arrayItemCart = Object.values(state.cart.cartItems);
      const cartItems = arrayItemCart.filter(
        (item => item._id !== action.payload._id)
    )
    setCartData({...cartItems})
    return {...state , cart:{...state.cart, cartItems}}
    }
    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch, dataCart };
  return <Cart.Provider value={value}>{children}</Cart.Provider>;
};

export default CartProvider;
