"use client";

import { convertToSubCurrency } from '@/utils/convertToSubCurrency';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';

type Props = {
  total: number;
}

export default function StripeCheckout({total}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(convertToSubCurrency(total))
    }).then(res => res.json()).then(data => setClientSecret(data.clientSecrete))
  }, [total])


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if(!stripe || !elements){
      return;
    }

    const {error: submitError} = await elements.submit();

    if (submitError){
      setErrorMessage(submitError.message!);
      setLoading(false);
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements, 
      clientSecret,
      confirmParams: {return_url: `http://www.localhost:3000/payment-success?amount=${total}`}
    });

    if (error){
      setErrorMessage(error.message!);
    }else {

    }

    setLoading(false);

    if(!clientSecret || !stripe || !elements){
      return (
        <div></div>
      );
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      
    </form>
  )
}