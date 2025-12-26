import { createAction } from '@reduxjs/toolkit'
import { CART_ACTION_TYPES } from './cart.types'

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  // return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  // if quantity is equal to 1 remove the item
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  // return back artitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
}

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

const addItemToCart = (productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd)
  updateCartItemsReducer(newCartItems)
}

const removeItemToCart = (cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove)
  updateCartItemsReducer(newCartItems)
}

const clearItemFromCart = (cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear)
  updateCartItemsReducer(newCartItems)
}
