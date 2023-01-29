export const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART';
export const REMOVE_BOOK_FROM_CART = 'REMOVE_BOOK_FROM_CART';
export const CHECKOUT = 'CHECKOUT';
export const FILTER_BOOKS = 'FILTER_BOOKS';
export const CLEAR_CART = 'CLEAR_CART'


export function addBookToCart(book) {
  return {
    type: ADD_BOOK_TO_CART,
    book
  };
}

export function removeBookFromCart(book) {
  return {
    type: REMOVE_BOOK_FROM_CART,
    book
  };
}

export function checkout() {
  return {
    type: CHECKOUT
  };
}

export const filterBooks = (search) => {
  return {
    type: 'FILTER_BOOKS',
    payload: search
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}
