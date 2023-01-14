import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
    const [deletingBuyers, set_deletingBuyers] = useState(null);

    // handle close modal
    const closeModal = () => {
        set_deletingBuyers(null);
    };

    const { data: allBuyers, isLoading, refetch } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:7000/users/allBuyers`, {
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

    // handle delete Buyers
    const handleDeleteBuyer = (buyer) => {
        fetch(`http://localhost:7000/users/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Buyers ${buyer.name} deleted successfully`);
                }
            })
            .catch(err => console.error('err', err));
    };

    if (isLoading) {
        return <Loading></Loading>;
    }


    return (
        <div>
            <h2 className="text-3xl text-center mb-3">Total Buyers: {allBuyers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row  --> */}
                        {
                            allBuyers.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => set_deletingBuyers(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingBuyers && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBuyers.name}. It can't be undone`}
                    successAction={handleDeleteBuyer}
                    successButtonName={'Delete'}
                    modalData={deletingBuyers}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllBuyers;