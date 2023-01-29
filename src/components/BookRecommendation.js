import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addBookToCart } from '../store/Actions';
import axios from 'axios';


function BookRecommendation( {addBookToCart} ) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=9d8xLzsyf2Ga9cyGdHk5T9a4L1q3Q0g7')
      .then(response => {
        setBooks(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  }

  const handleAddToCartClick = (book) => {
    addBookToCart(book);
  }  

  return (
    <div>
      <h1>Book Recommendations</h1>
      <ul>
        {books.map(book => (
          <li key={book.title} onClick={() => handleBookClick(book)}>
            {book.title}
          </li>
        ))}
      </ul>
      {selectedBook && (
        <div>
          <h2>Selected Book</h2>
          <p>Title: {selectedBook.title}</p>
          <p>Author: {selectedBook.author}</p>
          <p>Publisher: {selectedBook.publisher}</p>
          <button onClick={() => handleAddToCartClick(selectedBook)}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addBookToCart: book => dispatch(addBookToCart(book))
});

export default connect(null, mapDispatchToProps)(BookRecommendation);
