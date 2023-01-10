import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../contexts/AuthProvider';

const BookingModal = ({ modalData, successAction, closeModal }) => {
    // console.log("🚀 ~ modalData", modalData);
    const { user } = useContext(AuthContext);

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
    } = modalData;

    const { register, handleSubmit, formState: { errors } } = useForm();

    // handle Booked
    const handleBooked = (data) => {
        console.log('data :>> ', data);
    };

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="phone-booking-modal" className="modal-toggle" />
            <label htmlFor="phone-booking-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">

                    <figure><img src={phoneImage} alt="Album" /></figure>

                    <div className="flex justify-center w-full">
                        <form onSubmit={handleSubmit(handleBooked)}>
                            {/* #1 phone Name ------------------------------------ */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#1 Phone Name</span>
                                </label>
                                <input type="text"
                                    defaultValue={phoneName} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #2 Original Price -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#2 Original Price ($)</span>
                                </label>
                                <input type="number"
                                    defaultValue={originalPrice} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #3 Resale Price -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#3 Resale Price ($)</span>
                                </label>
                                <input type="number"
                                    defaultValue={resalePrice} disabled placeholder="product resale price" className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #4 Product Condition -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#4 Product Condition</span>
                                </label>
                                <input
                                    defaultValue={productCondition} disabled className="input input-bordered w-full max-w-xs"
                                />
                            </div>

                            {/* #5 Product Category -------------------------------------- */}
                            <div className='form-control w-full max-w-xs'>
                                <label className="label">
                                    <span className="label-text">#5 Product Category (Brand)</span>
                                </label>
                                <input type={'text'}
                                    defaultValue={categoryName} disabled className="input input-bordered w-full max-w-xs"
                                />
                            </div>
                            {/* #6 Product Description -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#6 Product Description</span>
                                </label>
                                <textarea type="text"
                                    defaultValue={productDescription} disabled placeholder="about product" className="textarea textarea-bordered w-full max-w-xs" />
                            </div>
                            {/* #7 Purchasing Date -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#7 Purchasing Date</span>
                                </label>
                                <input type="date"
                                    defaultValue={purchaseDate} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #8 Years of Use -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#8 Years of Use</span>
                                </label>
                                <input type="text"
                                    defaultValue={yearsOfUse} disabled className="input input-bordered w-full max-w-xs" />
                            </div>

                            {/* #9 Posted Time -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#9 Posted Time</span>
                                </label>
                                <input type="text"
                                    defaultValue={postedTime} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #10 Seller Name -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#10 Seller Name</span>
                                </label>
                                <input type="text"
                                    defaultValue={sellerName} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #11 Seller Email -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#11 Seller Email</span>
                                </label>
                                <input type="text"
                                    defaultValue={sellerEmail} disabled className="input input-bordered w-full max-w-xs" />
                            </div>


                            {/* #12 Seller Mobile Number -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#10 Seller Mobile Number</span>
                                </label>
                                <input type="number"
                                    defaultValue={mobileNumber} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #13 Seller Location -----------------------------------*/}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#11 Seller Location</span>
                                </label>
                                <input type="text"
                                    defaultValue={location} disabled className="input input-bordered w-full max-w-xs" />
                            </div>

                            {/* #14 Buyer Name */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#14 Buyer Name</span>
                                </label>
                                <input type="text"
                                    defaultValue={user?.displayName} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #15 Buyer Email */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#15 Buyer Email</span>
                                </label>
                                <input type="text"
                                    defaultValue={user?.email} disabled className="input input-bordered w-full max-w-xs" />
                            </div>
                            {/* #17 Buyer Mobile Number */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#17 Buyer Mobile Number</span>
                                </label>
                                <input type="number"
                                    {
                                    ...register("buyerMobileNumber", {
                                        required: "Buyer Mobile Number is Required"
                                    })
                                    }
                                    placeholder="buyer mobile number" className="input input-bordered w-full max-w-xs" />
                                {
                                    errors.buyerMobileNumber &&
                                    <p className='text-error'>{errors.buyerMobileNumber?.message}</p>
                                }
                            </div>
                            {/* #18 Meeting location */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">#18 Meeting location</span>
                                </label>
                                <input type="text"
                                    {
                                    ...register("buyerLocation", {
                                        required: "Meeting Location is Required"
                                    })
                                    }
                                    placeholder="meeting location" className="input input-bordered w-full max-w-xs" />
                                {
                                    errors.buyerLocation &&
                                    <p className='text-error'>{errors.buyerLocation?.message}</p>
                                }
                            </div>

                            <div className="form-control w-full max-w-xs mt-6">
                                <button onClick={() => successAction(modalData)} className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='flex justify-center mt-3'>
                        <button onClick={closeModal} className='btn btn-info btn-outline w-1/2'>Cancel</button>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                            <button className="btn btn-accent">Add to Wishlist</button>
                            <button className="btn btn-accent">Report to Admin</button>
                        </div>
                    </div>

                </label>
            </label>




        </div>
    );
};

export default BookingModal;