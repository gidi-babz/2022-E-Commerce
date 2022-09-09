import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);

  let foundProduct;
  let cartIndex;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id);

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
    setTotalQuantities(prevTotalQuantity => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const UpdateCartItems = cartItems.map(cartProduct => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(UpdateCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([{ ...product }, ...cartItems]);
    }

    toast.success(`${qty} ${product.name} was added to the cart`);
  };

  const onRemove = product => {
    foundProduct = cartItems.find(item => item._id === product._id);
    const newCartItems = cartItems.filter(item => item._id !== product._id);

    setTotalPrice(
      prevTotalPrice =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      prevTotalQuantities => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find(item => item._id === id);
    cartIndex = cartItems.findIndex(product => product._id === id);
    const newCartItems = cartItems.filter(item => item._id !== id);

    if (value === 'inc') {
      setCartItems([
        {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        },
        ...newCartItems,
      ]);

      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
    }

    if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
      }
    }
  };

  const increaseQty = () => {
    setQty(prevQty => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalQuantities,
        totalPrice,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
        toggleCartItemQuantity,
        index,
        setIndex,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
