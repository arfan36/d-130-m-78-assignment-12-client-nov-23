import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from './BookingModal';
import CategoryDetails from './CategoryDetails';

const CategorySingle = () => {
    const loadCategoryName = useLoaderData();
    const [bookedPhone, set_bookedPhone] = useState(null);

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
    const handleBookedPhone = (phone) => {
        console.log(phone);
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