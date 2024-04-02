import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import '../css/paymentForm.css';

const stripePromise = loadStripe('pk_test_51P0XIbRvRMUZJxVb5C3d925KwrWmqpGLUcKnJcIZRIWDQkCGmvtGpUQg29yf3mtpbTmjwKciYtDuT5poBJmhx3kT00hS2LcGLn');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[Error]', error);
      alert('Payment failed: ' + error.message);
    } else {
      console.log('Payment Method:', paymentMethod);
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="StripeElement custom-input"
        />
      </div>
      <div className="form-row">
        <label>Card Number</label>
        <CardNumberElement className="StripeElement" />
      </div>
      <div className="form-row">
        <label>Expiry Date</label>
        <CardExpiryElement className="StripeElement" />
      </div>
      <div className="form-row">
        <label>CVC</label>
        <CardCvcElement className="StripeElement" />
      </div>
      <div className="form-row">
        <label>Name on card</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name on card"
          required
          className="StripeElement custom-input"
        />
      </div>
      <div className="form-row">
        <label>Country or region</label>
        <select
          id="country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="StripeElement custom-input"
        >
          <option value="">Select Country</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
        </select>
      </div>
      <div className="form-row">
        <label>Amount</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="StripeElement custom-input"
        />
      </div>
      <div className="form-row submit-btn">
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </div>
    </form>
  );
};

const PaymentForm = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="header-content">
          <h1>RentRight</h1>
          <button className="go-back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </header>

      <div className="form-container">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>

      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
};

export default PaymentForm;

// CANADIAN CARD: 4000001240000000 (ANY FUTURE DATE, ANY CVC)