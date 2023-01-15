import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Guide = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pb-20">
                <h2 className="text-3xl text-center mb-8">Guide To Order</h2>
                <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
                    <div className="lg:py-6 lg:pr-16">
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg
                                            className="w-4 text-gray-600"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <line
                                                fill="none"
                                                strokeMiterlimit="10"
                                                x1="12"
                                                y1="2"
                                                x2="12"
                                                y2="22"
                                            />
                                            <polyline
                                                fill="none"
                                                strokeMiterlimit="10"
                                                points="19,15 12,22 5,15"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="pt-1 pb-8">
                                <p className="mb-2 text-lg font-bold">Step 1 (login page)</p>
                                <p className="text-gray-700">
                                    Visit our site and go to login page (Click {user?.uid ? <>login</> : <><Link to={'/login'} className="btn btn-xs btn-ghost bg-gray-200">login</Link></>} on the top-right)
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg
                                            className="w-4 text-gray-600"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <line
                                                fill="none"
                                                strokeMiterlimit="10"
                                                x1="12"
                                                y1="2"
                                                x2="12"
                                                y2="22"
                                            />
                                            <polyline
                                                fill="none"
                                                strokeMiterlimit="10"
                                                points="19,15 12,22 5,15"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="pt-1 pb-8">
                                <p className="mb-2 text-lg font-bold">Step 2 (Create New Account, skip if already)</p>
                                <p className="text-gray-700">
                                    Under LOGIN button, (New to here? click {user?.uid ? <>Create New Account</> : <><Link to={'/signup'} className={'btn btn-xs btn-ghost bg-gray-200'}>Create New Account</Link></>}) . Fill up your Name, Email address, Password and User type then press SIGNUP. Finished account setup
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg
                                            className="w-4 text-gray-600"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <line
                                                fill="none"
                                                strokeMiterlimit="10"
                                                x1="12"
                                                y1="2"
                                                x2="12"
                                                y2="22"
                                            />
                                            <polyline
                                                fill="none"
                                                strokeMiterlimit="10"
                                                points="19,15 12,22 5,15"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="pt-1 pb-8">
                                <p className="mb-2 text-lg font-bold">Step 3 (Phone Booking)</p>
                                <p className="text-gray-700">
                                    Now you can book advertised item or you can view Category wise phone clicking on that category. There will be a (BOOK NOW) button bellow each phone details. Clicking on BOOK NOW, phone will be added to MY ORDERS. You can add to WISHLIST or You can report it to Admin.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg
                                            className="w-4 text-gray-600"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <line
                                                fill="none"
                                                strokeMiterlimit="10"
                                                x1="12"
                                                y1="2"
                                                x2="12"
                                                y2="22"
                                            />
                                            <polyline
                                                fill="none"
                                                strokeMiterlimit="10"
                                                points="19,15 12,22 5,15"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-px h-full bg-gray-300" />
                            </div>
                            <div className="pt-1 pb-8">
                                <p className="mb-2 text-lg font-bold">Step 4 (Final step: Payment)</p>
                                <p className="text-gray-700">
                                    On MY ORDERS or WISHLIST, now it's time to pay to confirm your order.
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                        <svg
                                            className="w-6 text-gray-600"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <polyline
                                                fill="none"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="10"
                                                points="6,12 10,16 18,8"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="mb-2 text-lg font-bold">Success</p>
                                <p className="text-gray-700" />
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            className="inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full"
                            src={"https://i.ibb.co/rFnGb10/the-average-tech-guy-Dsm-Dqi-Ydua-U-unsplash.jpg"}
                            alt="phone"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Guide;