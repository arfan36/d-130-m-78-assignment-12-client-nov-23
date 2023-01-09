import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import AdvertisedItems from './AdvertisedItems';

const Advertised = () => {
    // get advertised items
    const { data: advertisedItems } = useQuery({
        queryKey: ['advertised-limit'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7000/advertised-limit`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <h2 className="text-3xl text-center mt-16">Advertised items</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center my-8 mx-8'>
                {
                    advertisedItems?.map(item => <AdvertisedItems
                        key={item._id}
                        item={item}
                    ></AdvertisedItems>)
                }
            </div>
            <div className='text-end'>
                <Link to={'/see-all'}><button className='btn btn-sm btn-primary'>See All</button></Link>
            </div>
        </div>
    );
};

export default Advertised;