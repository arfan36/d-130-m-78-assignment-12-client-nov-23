import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';
import CategoryDetails from './CategoryDetails';

const CategorySingle = () => {
    const loaderData = useLoaderData();
    const [categorySingles, set_categorySingles] = useState(loaderData);
    const [bookedPhone, set_bookedPhone] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:7000/category/${categorySingles[0].categoryId}`)
            .then(res => res.json())
            .then(data => set_categorySingles(data));
    }, [categorySingles]);


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
                    ></BookingModal>
                }
            </div>
        </>
    );
};

export default CategorySingle;