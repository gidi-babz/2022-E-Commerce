import React, { useRef } from 'react';
import Link from 'next/link';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

const Cart = () => {
	const cartRef = useRef();
	const { totalPrice, totalQuantities, cartItems, setShowCart } =
		useStateContext();
	return (
		<div className="cart-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button
					type="button"
					className="cart-heading"
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">{totalQuantities}</span>
				</button>

				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your shopping cart is empty</h3>
						<Link href="/">
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className="btn"
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className="product-container">
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<div key={item._id} className="product">
								<img
									src={urlFor(item?.image[0])}
									alt={item.name}
									className="cart-product-image"
								/>

								<div className="item-desc">
									<div className="flex top">
										<h5>{item.name}</h5>
										<h4>${item.price}</h4>
									</div>

									<div className="flex bottom">
										<div>
											<p className="quantity-desc">
												<span onClick="" className="minus">
													<AiOutlineMinus />
												</span>
												<span onClick="" className="num">
													0
												</span>
												<span onClick="" className="plus">
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button type="button" onClick="" className="remove-item">
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className="cart-bottom">
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
						<div className="button-container">
							<button className="btn" type="button" onclick="">
								Pay with Stripe
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
