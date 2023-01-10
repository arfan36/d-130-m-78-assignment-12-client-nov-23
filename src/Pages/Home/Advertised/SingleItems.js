import React from 'react';
import { MdVerified } from 'react-icons/md';
import useSeller from '../../../hooks/useSeller';
import Loading from '../../Shared/Loading/Loading';

const SingleItems = ({ phoneDetails, set_bookedPhone }) => {

    const {
        categoryName,
        location,
        mobileNumber,
        originalPrice,
        phoneImage,
        phoneName,
        postedTime,
        productCondition,
        productDescription,
        purchaseDate,
        resalePrice,
        sellerEmail,
        sellerName,
        yearsOfUse,
        // verifiedSellerStatus,
        // paid
    } = phoneDetails;

    // get seller info 
    const [seller, isSellerLoading] = useSeller(sellerEmail);
    if (isSellerLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={phoneImage} alt={phoneName} className="rounded-xl" />
                </figure>
                <div className="card-body items-start text-center ml-10">
                    <h2 className="card-title">{phoneName}</h2>
                    <p>Original Price: <span className='font-bold'>${originalPrice}</span></p>
                    <p>Current Price: <span className='font-bold'>${resalePrice}</span></p>
                    <p>Brand Name: <span className='font-bold'>{categoryName}</span></p>
                    <p>Product Condition: <span className='font-bold'>{productCondition}</span></p>
                    <p>Product Description: <span className='font-bold'><span className='font-bold'></span>{productDescription}</span></p>
                    <p>Purchase Date: <span className='font-bold'>{purchaseDate}</span></p>
                    <p>Posted Time: <span className='font-bold'>{postedTime}</span></p>
                    <p>Years of Use: <span className='font-bold'>{yearsOfUse}</span></p>
                    <div className='flex items-center gap-1'>
                        <p> Seller Name: <span className='font-bold'>{sellerName}</span></p>
                        <p className='text-info'>
                            {
                                seller?.verifiedSellerStatus &&
                                <MdVerified></MdVerified>
                            }
                        </p>
                    </div>
                    <p>Seller Email: <span className='font-bold'>{sellerEmail}</span></p>
                    <p>Seller Mobile Number: <span className='font-bold'>{mobileNumber}</span></p>
                    <p>Location: <span className='font-bold'>{location}</span></p>

                    <div className="card-actions">
                        <label htmlFor="phone-booking-modal" onClick={() => set_bookedPhone(phoneDetails)} className="btn btn-primary"
                        >
                            Book Now
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleItems;