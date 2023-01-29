import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterBooks } from '../store/Actions';

function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(filterBooks(search));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for books..."
        value={search}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
// const mapStateToProps = state => ({
//   books: state.books
// });

// const mapDispatchToProps = dispatch => ({
//   filterBooks: book => dispatch(filterBooks(book))

// });
// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);