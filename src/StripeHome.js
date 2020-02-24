// PROBABLY JUST TRASH THIS. USE REACT STRIPE JS



import React from 'react';
import {loadStripe} from '@stripe/stripe-js';

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import StripeCheckout from 'react-stripe-checkout';

export default class StripeHome extends React.Component {
  onToken = (token) => {
  	console.log("ARE WE GETTING THIS FAR IN THE STRIPE HOME?")
  	console.log(token)
  	console.log('http://localhost:8000/quizbank/stripe/charge/')
    fetch('http://localhost:8000/quizbank/stripe/charge/', { // post to django to 
      method: 'POST',
      body: JSON.stringify(token),
    }).then(data => {
      	
        alert(`We are in business!`);
        console.log(data)
    });
  }
 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        amount={500} // cents
  		currency="USD"
        stripeKey="pk_test_q8Uwo30uK896Zll6gRGeSEdA0016m1RzTP"
      />


    )
  }
}

/**
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

const StripeHome = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardElement
		  options={{
		    style: {
		      base: {
		        fontSize: '16px',
		        color: '#424770',
		        '::placeholder': {
		          color: '#aab7c4',
		        },
		      },
		      invalid: {
		        color: '#9e2146',
		      },
		    },
		  }}
		/>
    </Elements>
  );
};

export default StripeHome;
**/