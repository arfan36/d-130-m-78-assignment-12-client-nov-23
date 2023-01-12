import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ReportedItems = () => {
    const [deletingProduct, set_deletingProduct] = useState(null);

    // handle close modal
    const closeModal = () => {
        set_deletingProduct(null);
    };

    const { data: reportedItems, isLoading, refetch } = useQuery({
        queryKey: ["reportedItems"],
        queryFn: async () => {
            const res = await fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/reported-product`, {
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

    // handle Delete Phone
    const handleDeleteProduct = (phone) => {
        fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/reported-product/${phone.phoneId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount > 0) {
                refetch();
                toast.success(`product ${phone.phoneName} deleted successfully`);
            }
        }).catch(err => console.error('err', err));


    };

    return (
        <div>
            <h2 className="text-3xl text-center">Total Report: {reportedItems.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Title</th>
                            <th>Reported By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row  --> */}
                        {
                            reportedItems.map((phone, i) => <tr key={phone._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={phone.phoneImage} alt='phone' />
                                        </div>
                                    </div>
                                </th>
                                <td>{phone.phoneName}</td>
                                <td>{phone.buyerEmail}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => set_deletingProduct(phone)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.phoneName}. It can't be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName={'Delete'}
                    modalData={deletingProduct}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ReportedItems;