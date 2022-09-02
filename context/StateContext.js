import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	const onAdd = (product, quantity) => {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);

		if (checkProductInCart) {
			const UpdateCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(UpdateCartItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} was added to the cart`);
	};

	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decreaseQty = () => {
		setQty((prevQty) => {
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
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
