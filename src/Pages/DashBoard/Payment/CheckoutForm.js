import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const CheckoutForm = ({ bookedPhone }) => {
    const { user } = useContext(AuthContext);
    const [clientSecret, set_clientSecret] = useState('');
    const [transactionId, set_transactionId] = useState('');
    const [success, set_success] = useState('');
    const [cardError, set_cardError] = useState('');
    const [processing, set_processing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { displayName, email } = user;
    const { _id, phoneImage, phoneName, resalePrice, sellerEmail } = bookedPhone;

    // create payment intent as soon as the page loads
    useEffect(() => {
        fetch(`http://localhost:7000/create-payment-intent`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ resalePrice })
        }).then(res => res.json()).then(data => {
            set_clientSecret(data.clientSecret);
        }).catch(err => console.error('err', err));
    }, [resalePrice]);

    // handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.error('error', error);
            set_cardError(error.message);
        }
        else {
            set_cardError('');
        }

        set_success('');
        set_processing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: displayName,
                        email: email
                    }
                }
            }
        );
        if (confirmError) {
            set_cardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {

            // save payment info in the database
            const payment = {
                phoneImage,
                phoneName,
                resalePrice,
                paid: true,
                transactionId: paymentIntent.id,
                buyerName: displayName,
                buyerEmail: email,
                productId: _id,
                sellerEmail
            };
            fetch(`http://localhost:7000/payments`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json()).then(data => {
                console.log('data :>> ', data);
                if (data.insertedId) {
                    set_success('Congrats! Your payment completed');
                    set_transactionId(paymentIntent.id);
                    toast.success('Payment Successfully Completed');
                }
            }).catch(err => console.error('err', err));

        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;