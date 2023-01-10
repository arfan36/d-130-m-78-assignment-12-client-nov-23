import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const AdvertisedItems = ({ item, set_bookedPhone }) => {
    const { phoneName, phoneImage, postedTime, resalePrice } = item;
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={phoneImage} alt="phone" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{phoneName}</h2>
                    <h3 className="">Resale Price: <span className='text-2xl font-bold'>${resalePrice}</span></h3>
                    <p>Posted Time: {postedTime}</p>
                    <div className="card-actions justify-end">
                        {
                            user?.uid &&
                            <label htmlFor="phone-booking-modal"
                                onClick={() => set_bookedPhone(item)}
                                className="btn btn-primary"
                            >
                                Book Now
                            </label>
                        }
                        {
                            !user?.uid &&
                            <Link to={'/login'}><button className='btn btn-primary'>Book Now</button></Link>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvertisedItems;