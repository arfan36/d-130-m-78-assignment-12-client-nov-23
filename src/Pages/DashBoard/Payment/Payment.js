import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const paymentPhoneId = useLoaderData();
    const { data: bookedPhone, isLoading } = useQuery({
        queryKey: ['bookedPhone'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:7000/booked/${paymentPhoneId}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            } catch (err) {
                console.error('err', err);
            }
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    // use destructing after isLoading or you will //@   get an error
    const { phoneName, resalePrice } = bookedPhone;

    return (
        <div>
            <h3 className="text-3xl text-center">Payment for <strong>{phoneName}</strong></h3>
            <p className='text-xl text-center'>Please pay <strong>${resalePrice}</strong></p>
            <div className="w-96 my-12">
                <Elements stripe={stripePromise}>
                    <CheckoutForm bookedPhone={bookedPhone}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;