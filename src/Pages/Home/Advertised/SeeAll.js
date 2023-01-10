import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../Categories/Category/BookingModal';
import SingleItems from './SingleItems';

const SeeAll = () => {
    const [bookedPhone, set_bookedPhone] = useState(null);

    // handle close modal
    const closeModal = () => {
        set_bookedPhone(null);
    };

    const { data: allAdvertisedItems, isLoading, refetch } = useQuery({
        queryKey: ['advertisedItems'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7000/advertised`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    // handle Booked Phone
    const handleBookedPhone = (phone) => {
        console.log(phone);
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center mb-6">Advertised Items: {allAdvertisedItems.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center'>
                {
                    allAdvertisedItems.map(phoneDetails => <SingleItems
                        key={phoneDetails._id}
                        phoneDetails={phoneDetails}
                        set_bookedPhone={set_bookedPhone}
                    ></SingleItems>)
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
        </div>
    );
};

export default SeeAll;