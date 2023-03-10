import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: myOrders, isLoading } = useQuery({
        queryKey: ['booked'],
        queryFn: async () => {
            const res = await fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/booked?buyerEmail=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center mb-2">My Orders: {myOrders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row  --> */}
                        {
                            myOrders.map((order, i) => <tr
                                key={order._id}
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={order.phoneImage} alt='phone' />
                                        </div>
                                    </div>
                                </td>
                                <td>{order.phoneName}</td>
                                <td>${order.resalePrice}</td>
                                <td>
                                    {
                                        order.resalePrice && order.paid &&
                                        <p className='rounded-full text-center w-1/2 py-3 bg-success'>PAID</p>
                                    }
                                    {
                                        order.resalePrice && !order.paid &&
                                        <Link
                                            to={`/dashboard/payment/${order.productId}`}
                                        >
                                            <button className='btn btn-ghost bg-slate-200'>pay</button>
                                        </Link>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;