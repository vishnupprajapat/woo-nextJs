"use client"
import Link from 'next/link';
import { useContext, useState } from 'react';
import CartItem from "./CartItem";
import { v4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import {isEmpty} from 'lodash'
import { AppContext } from '@/context/AppContext';
import { getFormattedCart,getUpdatedItems } from '@/lib/functions';
import CLEAR_CART_MUTATION from '@/mutations/clear-cart';
import GET_CART from '@/queries/get-cart';
import UPDATE_CART from '@/mutations/update-cart';


const CartItemsContainer = () => {


	// @TODO wil use it in future variations of the project.
	const [ cart, setCart ] = useContext( AppContext );
	const [requestError, setRequestError] = useState( null );
	const { loading, error, data, refetch } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (fetchedData) => {
            if (fetchedData) {
                const updatedCart = getFormattedCart(fetchedData);
                localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
                setCart(updatedCart);
            }
        }
    });

    // Update Cart Mutation
    const [updateCart, { loading: updateCartProcessing, error: updateCartError }] = useMutation(UPDATE_CART, {
        onCompleted: refetch,
        onError: (error) => {
            setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
        }
    });

    // Clear Cart Mutation
    const [clearCart, { loading: clearCartProcessing, error: clearCartError }] = useMutation(CLEAR_CART_MUTATION, {
        onCompleted: refetch,
        onError: (error) => {
            setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
        }
    });

    /**
     * Handle removing a product from the cart
     * @param {Event} event 
     * @param {String} cartKey 
     * @param {Array} products 
     */
    const handleRemoveProductClick = (event, cartKey, products) => {
        event.stopPropagation();

        if (products.length) {
            const updatedItems = getUpdatedItems(products, 0, cartKey); // Setting quantity to 0 removes item
            updateCart({
                variables: {
                    input: {
                        clientMutationId: v4(),
                        items: updatedItems
                    }
                }
            });
        }
    };

    /**
     * Handle clearing the entire cart
     * @param {Event} event 
     */
    const handleClearCart = (event) => {
        event.stopPropagation();

        if (!clearCartProcessing) {
            clearCart({
                variables: {
                    input: {
						clientMutationId: v4(),
                        all: true
                    }
                }
            });
        }
    };
	return (
		<div className="cart product-cart-container container mx-auto my-32 px-4 xl:px-0">
			{ cart ? (
				<div className="woo-next-cart-wrapper container">
					<div className="cart-header grid grid-cols-2 gap-4">
						<h1 className="text-2xl mb-5 uppercase">Cart</h1>
						{/*Clear entire cart*/}
						<div className="clear-cart text-right">
							<button className="px-4 py-1 bg-gray-500 text-white rounded-sm w-auto" onClick={ ( event ) => handleClearCart( event ) } disabled={ clearCartProcessing }>
								<span className="woo-next-cart">Clear Cart</span>
								<i className="fa fa-arrow-alt-right"/>
							</button>
							{ clearCartProcessing ? <p>Clearing...</p> : '' }
							{ updateCartProcessing ? <p>Updating...</p> : null }
						</div>
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-4 gap-0 xl:gap-4 mb-5">
						<table className="cart-products table-auto col-span-3 mb-5">
								<thead className="text-left">
								<tr className="woo-next-cart-head-container">
									<th className="woo-next-cart-heading-el" scope="col"/>
									<th className="woo-next-cart-heading-el" scope="col"/>
									<th className="woo-next-cart-heading-el" scope="col">Product</th>
									<th className="woo-next-cart-heading-el" scope="col">Price</th>
									<th className="woo-next-cart-heading-el" scope="col">Quantity</th>
									<th className="woo-next-cart-heading-el" scope="col">Total</th>
								</tr>
								</thead>
								<tbody>
								{ cart.products.length && (
									cart.products.map( item => (
										<CartItem
											key={ item.productId }
											item={ item }
											updateCartProcessing={ updateCartProcessing }
											products={ cart.products }
											handleRemoveProductClick={ handleRemoveProductClick }
											updateCart={ updateCart }
										/>
									) )
								) }
								</tbody>
							</table>

						{/*Cart Total*/ }
						<div className="row woo-next-cart-total-container border p-5 bg-gray-200">
							<div className="">
								{/* <h2 className="text-2xl">Cart Total</h2> */}
								<table className="table table-hover mb-5">
									<tbody>
									<tr className="table-light flex flex-col">
										<td className="woo-next-cart-element-total text-2xl font-normal">Subtotal</td>
										<td className="woo-next-cart-element-amt text-2xl font-bold">{ ( 'string' !== typeof cart.totalProductsPrice ) ? cart.totalProductsPrice.toFixed(2) : cart.totalProductsPrice }</td>
									</tr>
									{/* <tr className="table-light">
										<td className="woo-next-cart-element-total">Total</td>
										<td className="woo-next-cart-element-amt">{ ( 'string' !== typeof cart.totalProductsPrice ) ? cart.totalProductsPrice.toFixed(2) : cart.totalProductsPrice }</td>
									</tr> */}
									</tbody>
								</table>
								<Link href="/checkout">
									<button className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full">
										<span className="woo-next-cart-checkout-txt">Proceed to Checkout</span>
										<i className="fas fa-long-arrow-alt-right"/>
									</button>
								</Link>
							</div>
						</div>
					</div>

					{/* Display Errors if any */}
					{ requestError ? <div className="row woo-next-cart-total-container mt-5"> { requestError } </div> : '' }
				</div>
			) : (
				<div className="container mx-auto my-32 px-4 xl:px-0">
					<h2 className="text-2xl mb-5">No items in the cart</h2>
					<Link href="/">
						<button className="bg-purple-600 text-white px-5 py-3 rounded-sm">
							<span className="woo-next-cart-checkout-txt">Add New Products</span>
							<i className="fas fa-long-arrow-alt-right"/>
						</button>
					</Link>
				</div>
			) }
		</div>

	);
};

export default CartItemsContainer;
