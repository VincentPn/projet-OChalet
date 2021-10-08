import { useState, useEffect } from 'react';

import { useDispatch, useSelector  } from 'react-redux';

import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { fetchStripeInfos } from '../../actions/user';

import { saveBookingDates } from '../../actions/offers';

import './paymentform.scss';

export default function Paymentform2() {
  console.log("4000 0082 6000 3178")
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  // const [clientSecret, setClientSecret] = useState('');
  const clientSecret = useSelector((state) => state.user.stripeInfos.clientSecret);
  console.log(clientSecret, 'SALUT');
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

//   const {offerID, booking_start, booking_end, customer_email} = request.body

  // useEffect(() => {
    // Create PaymentIntent as soon as the page loads
  //   window
  //     .fetch('https://ochalet-api.herokuapp.com/payment_intent', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({items: [{ id: 'xl-tshirt' }]})
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setClientSecret(data.clientSecret);
  //     });
  // }, []);

  useEffect(() => {
    dispatch(fetchStripeInfos());
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#bf3636',
        iconColor: '#bf3636'
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);


    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    console.log(payload)

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      dispatch(saveBookingDates());
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <h2>Paiement</h2>
      <CardElement id='card-element' options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id='submit'
      >
        <span id='button-text'>
          {processing ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            'Payer'
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Paiement réussi !
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {' '}
          Stripe dashboard.
        </a> Actualiser la page pour payer à nouveau.
      </p>
    </form>
  );
}
