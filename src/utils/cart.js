import { v4 as uuidv4 } from 'uuid';
/**
 * Clear the cart.
 *
 * @param {function} clearCartMutation clearCartMutation function
 * @param {string} previousRequestError Error from previous request.
 *
 * @returns {Promise<{cartCleared: boolean, error: string}>}
 */

export const clearTheCart = async (clearCartMutation, previousRequestError) => {
    if (previousRequestError) {
        return { cartCleared: false, error: previousRequestError };
    }

    try {
        const { data } = await clearCartMutation({
            variables: {
                input: {
                    clientMutationId: uuidv4(),
                    all: true,
                },
            },
        });

        return {
            cartCleared: Boolean(data?.removeItemsFromCart?.cartItems?.length),
            error: '',
        };
    } catch (error) {
        return { cartCleared: false, error: error.message ?? 'An error occurred' };
    }
};


/**
 * @TODO will update this in future, when required.
 * Handles adding items to the cart.
 *
 * @return {void}
 */
// const handleAddToCartLocalStorage = () => {
//
// 	// If component is rendered client side.
// 	if ( process.browser ) {
//
// 		let existingCart = localStorage.getItem( 'woo-next-cart' );
//
// 		// If cart has item(s) already, update existing or add new item.
// 		if ( existingCart ) {
//
// 			existingCart = JSON.parse( existingCart );
//
// 			const qtyToBeAdded = 1;
//
// 			const updatedCart = updateCart( existingCart, product, qtyToBeAdded );
//
// 			setCart( updatedCart );
//
// 		} else {
// 			/**
// 			 * If No Items in the cart, create an empty array and add one.
// 			 * @type {Array}
// 			 */
// 			const newCart = addFirstProduct( product );
// 			setCart( newCart );
// 		}
//
// 		// Show View Cart Button
// 		setShowViewCart( true )
// 	}
// };
