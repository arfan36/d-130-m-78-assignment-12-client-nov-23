import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    const [deletingSeller, set_deletingSeller] = useState(null);

    // handle close modal
    const closeModal = () => {
        set_deletingSeller(null);
    };

    const { data: allSellers, isLoading, refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:7000/users/allSellers`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            } catch (err) {
                console.error('err', err);
            }
        }
    });

    // handle Verified Seller Status
    const handleVerifiedSellerStatus = (seller) => {
        fetch(`http://localhost:7000/users/${seller._id}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()).then(data => {
            console.log('data :>> ', data);
            if (data.modifiedCount > 0) {
                refetch();
                toast.success(`seller ${seller.name} verified successfully`);
            }
        }).catch(err => console.error('err', err));
    };

    // handle delete Seller
    const handleDeleteSeller = (seller) => {
        fetch(`http://localhost:7000/users/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Seller ${seller.name} deleted successfully`);
                }
            })
            .catch(err => console.error('err', err));
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center mb-3">Total Sellers: {allSellers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row  --> */}
                        {
                            allSellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => set_deletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>

                                </td>
                                <td>
                                    {
                                        !seller.verifiedSellerStatus &&
                                        <button onClick={() => handleVerifiedSellerStatus(seller)} className='btn btn-ghost btn-sm bg-slate-200'>Verify</button>
                                    }
                                    {
                                        seller.verifiedSellerStatus &&
                                        <p className='bg-success text-center rounded-xl'>Verified</p>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSeller.name}. It can't be undone`}
                    successAction={handleDeleteSeller}
                    successButtonName={'Delete'}
                    modalData={deletingSeller}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;