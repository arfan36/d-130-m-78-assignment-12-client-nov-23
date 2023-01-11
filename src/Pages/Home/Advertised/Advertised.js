import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../Categories/Category/BookingModal';
import AdvertisedItems from './AdvertisedItems';

const Advertised = () => {
    const [bookedPhone, set_bookedPhone] = useState(null);

    // handle close modal
    const closeModal = () => {
        set_bookedPhone(null);
    };

    // get advertised items
    const { data: advertisedItems, isLoading, refetch } = useQuery({
        queryKey: ['advertised-limit'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7000/advertised-limit`, {
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
        console.log("phone, formData", phone, formData);
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center mt-16">Advertised items</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center my-8 mx-8'>
                {
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
                <Link to={'/see-all'}><button className='btn btn-sm btn-primary'>See All</button></Link>
            </div>
        </div>
    );
};

export default Advertised;