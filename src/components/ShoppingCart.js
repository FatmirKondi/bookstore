import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeBookFromCart, checkout, clearCart } from '../store/Actions';

function ShoppingCart({ cart, removeBookFromCart, checkout }) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    if (!formData.cardNumber) {
      tempErrors.cardNumber = "Card number is required.";
      isValid = false;
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      tempErrors.cardNumber = "Card number must be 16 digits.";
      isValid = false;
    }
    if (!formData.expirationDate) {
      tempErrors.expirationDate = "Expiration date is required.";
      isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
      tempErrors.expirationDate = "Expiration date must be in the format MM/YY.";
      isValid = false;
    }
    if (!formData.cvv) {
      tempErrors.cvv = "CVV is required.";
      isValid = false;
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      tempErrors.cvv = "CVV must be 3 digits.";
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
    
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()) {
      checkout();
      setFormData({
        cardNumber: "",
        expirationDate: "",
        cvv: ""
      });
      alert("Checkout Successful!")
      clearCart();
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul className='cart'>
        {cart.map(book => (
          <li key={book.title}>
            {book.title}
            <button onClick={() => removeBookFromCart(book)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            onChange={handleChange}
            value={formData.cardNumber}
          />
          {errors.cardNumber && <p>{errors.cardNumber}</p>}
        </label>
        <br />
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            onChange={handleChange}
            value={formData.expirationDate}
          />
          {errors.expirationDate && <p>{errors.expirationDate}</p>}
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            onChange={handleChange}
            value={formData.cvv}
          />
          {errors.cvv && <p>{errors.cvv}</p>}
        </label>
        <br />
        <button type="submit">Submit</button>
        </form>
      {cart.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  removeBookFromCart: book => dispatch(removeBookFromCart(book)),
  checkout: () => dispatch(checkout()),
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
