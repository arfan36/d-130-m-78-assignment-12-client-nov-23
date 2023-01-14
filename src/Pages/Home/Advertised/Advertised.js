import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../Categories/Category/BookingModal';
import AdvertisedItems from './AdvertisedItems';

const Advertised = () => {
    const [bookedPhone, set_bookedPhone] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // handle close modal
    const closeModal = () => {
        set_bookedPhone(null);
    };

    // get advertised items
    const { data: advertisedItems, isLoading } = useQuery({
        queryKey: ['advertised-limit'],
        queryFn: async () => {
            const res = await fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/advertised-limit`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    // handle booked phone
    const handleBookedPhone = (phone, formData) => {
        const { categoryName, location, mobileNumber, originalPrice, phoneImage, phoneName, postedTime, productCondition, productDescription, purchaseDate, resalePrice, sellerEmail, sellerName, yearsOfUse, _id } = phone;

        const { buyerLocation, buyerMobileNumber } = formData;

        const booked = { buyerLocation, buyerMobileNumber, buyerName: user?.displayName, buyerEmail: user?.email, categoryName, location, mobileNumber, originalPrice, phoneImage, phoneName, postedTime, productCondition, productDescription, purchaseDate, resalePrice, sellerEmail, sellerName, yearsOfUse, productId: _id };

        // save info to database
        fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/booked`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booked)
        }).then(res => res.json()).then(result => {
            console.log("🚀 ~ result", result);
            toast.success(`${phoneName} is Booked successfully`);
            navigate('/dashboard/buyer-myOrder');
        }).catch(err => console.error('err', err));
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            {
                user?.uid &&
                <>
                    <h2 className="text-3xl text-center mt-16">Advertised items</h2>
                </>
            }
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center my-8 mx-8'>
                {advertisedItems.length > 0 &&
                    advertisedItems?.map(item => <AdvertisedItems
                        key={item._id}
                        item={item}
                        set_bookedPhone={set_bookedPhone}
                    ></AdvertisedItems>)
                }
            </div>
            <div>
                {
                    bookedPhone && <BookingModal
                        modalData={bookedPhone}
                        successAction={handleBookedPhone}
                        closeModal={closeModal}
                    ></BookingModal>
                }
            </div>
            <div className='text-end'>
                {
                    user?.uid &&
                    <><Link to={'/see-all'}><button className='btn btn-sm btn-primary'>See All</button></Link></>
                }
            </div>
        </div>
    );
};

export default Advertised;