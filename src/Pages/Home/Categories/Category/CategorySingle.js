import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import BookingModal from './BookingModal';
import CategoryDetails from './CategoryDetails';

const CategorySingle = () => {
    const loadCategoryName = useLoaderData();
    const [bookedPhone, set_bookedPhone] = useState(null);

    const { data: categorySingles, refetch, isLoading } = useQuery({
        queryKey: ['categoryName'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7000/products/${loadCategoryName}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }


    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center'>
                {
                    categorySingles.map(phoneDetails => <CategoryDetails
                        key={phoneDetails._id}
                        phoneDetails={phoneDetails}
                        set_bookedPhone={set_bookedPhone}
                    ></CategoryDetails>)
                }
            </div>
            <div>
                {
                    bookedPhone &&
                    <BookingModal
                        bookedPhone={bookedPhone}
                        set_bookedPhone={set_bookedPhone}
                        refetch={refetch}
                    ></BookingModal>
                }
            </div>
        </>
    );
};

export default CategorySingle;