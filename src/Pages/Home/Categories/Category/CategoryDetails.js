import React from 'react';
import { MdVerified } from "react-icons/md";

const CategoryDetails = ({ phoneDetails, set_bookedPhone }) => {
    const {
        phoneName,
        phoneImage,
        location,
        originalPrice,
        resalePrice,
        yearsOfUse,
        postedTime,
        sellerName,
        verifiedSellerStatus,
    } = phoneDetails;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={phoneImage} alt={phoneName} className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{phoneName}</h2>
                    <p>Location: {location}</p>
                    <p>Original Price: ${originalPrice}</p>
                    <p>Current Price: ${resalePrice}</p>
                    <p>Years of Use: {yearsOfUse}</p>
                    <p>Posted Time: {postedTime}</p>
                    <div className='flex items-center gap-1'>
                        <p> Seller Name: {sellerName}</p>
                        <p className='text-info'>
                            {
                                verifiedSellerStatus === "true" &&
                                <MdVerified></MdVerified>
                            }
                        </p>
                    </div>

                    <div className="card-actions">
                        <label htmlFor="phone-booking-modal" onClick={() => set_bookedPhone(phoneDetails)} className="btn btn-primary">Book Now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;