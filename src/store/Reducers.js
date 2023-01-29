import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART, FILTER_BOOKS, CHECKOUT, CLEAR_CART } from './Actions';

const initialState = {
  books: [],
  cart: [],
  search: '',
  filteredBooks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.book]
      };
    case REMOVE_BOOK_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(book => book.title !== action.book.title)
      };
    case CHECKOUT:
      return {
        ...state,
        cart: []
      };
    case CLEAR_CART:
        return {
          ...state,
          cart: []
        };
    case FILTER_BOOKS:
      return {
        ...state,
        search: action.payload,
        books: state.books.filter(book => 
          book.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          book.author.toLowerCase().includes(action.payload.toLowerCase()) ||
          book.publisher.toLowerCase().includes(action.payload.toLowerCase()),
          )
        };
    default:
      return state;
  }
};
export default reducer;