import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from './BookingModal';
import CategoryDetails from './CategoryDetails';

const CategorySingle = () => {
    const loadCategoryName = useLoaderData();
    const [bookedPhone, set_bookedPhone] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();



    // handle close modal
    const closeModal = () => {
        set_bookedPhone(null);
    };

    const { data: categorySingles, isLoading } = useQuery({
        queryKey: ['categoryName'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:7000/products/${loadCategoryName}`, {
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

    // handle booked phone
    const handleBookedPhone = (phone, formData) => {
        const { categoryName, location, mobileNumber, originalPrice, phoneImage, phoneName, postedTime, productCondition, productDescription, purchaseDate, resalePrice, sellerEmail, sellerName, yearsOfUse, _id } = phone;

        const { buyerLocation, buyerMobileNumber } = formData;

        const booked = { buyerLocation, buyerMobileNumber, buyerName: user?.displayName, buyerEmail: user?.email, categoryName, location, mobileNumber, originalPrice, phoneImage, phoneName, postedTime, productCondition, productDescription, purchaseDate, resalePrice, sellerEmail, sellerName, yearsOfUse, productId: _id };

        // save info to database
        fetch(`http://localhost:7000/booked`, {
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
        <>
            <div>
                <h2 className="text-3xl text-center">Total : {categorySingles.length}</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center'>
                    {
                        categorySingles.map(phoneDetails => <CategoryDetails
                            key={phoneDetails._id}
                            phoneDetails={phoneDetails}
                            set_bookedPhone={set_bookedPhone}
                        ></CategoryDetails>)
                    }
                </div>
            </div>
            <div>
                {
                    bookedPhone &&
                    <BookingModal
                        modalData={bookedPhone}
                        successAction={handleBookedPhone}
                        closeModal={closeModal}
                    ></BookingModal>
                }
            </div>
        </>
    );
};

export default CategorySingle;