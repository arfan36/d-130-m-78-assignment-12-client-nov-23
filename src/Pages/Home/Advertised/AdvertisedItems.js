import React from 'react';

const AdvertisedItems = ({ item }) => {
    const { phoneName, phoneImage, postedTime, resalePrice } = item;
    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={phoneImage} alt="phone" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{phoneName}</h2>
                    <h3 className="">Resale Price: <span className='text-2xl font-bold'>${resalePrice}</span></h3>
                    <p>Posted Time: {postedTime}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvertisedItems;