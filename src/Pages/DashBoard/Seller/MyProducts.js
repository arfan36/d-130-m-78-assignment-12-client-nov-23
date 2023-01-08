import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, set_deletingProduct] = useState(null);

    // handle close modal
    const closeModal = () => {
        set_deletingProduct(null);
    };

    // get product list on current user
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:7000/products?sellerEmail=${user?.email}`, {
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

    // handle delete product
    const handleDeleteProduct = (product) => {
        fetch(`http://localhost:7000/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()).then(data => {
            if (data.deletedCount > 0) {
                refetch();
                toast.success(`product ${product.phoneName} deleted successfully`);
            }
        }).catch(err => console.error('err', err));
    };

    // if Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl">My Products: {products?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Advertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={product.phoneImage} alt="doctor" />
                                        </div>
                                    </div>
                                </th>
                                <th>{product.phoneName}</th>
                                <td>
                                    {
                                        !product.paid &&
                                        <>Available</>
                                    }
                                    {
                                        product.paid &&
                                        <>Sold</>
                                    }
                                </td>
                                <td>{product.resalePrice}</td>
                                <td>
                                    {/* The button to open modal */}
                                    <label onClick={() => set_deletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                                <td>
                                    {
                                        !product.paid &&
                                        <button className='btn btn-ghost btn-sm'>Advertise</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    modalData={deletingProduct}
                    closeModal={closeModal}
                    successAction={handleDeleteProduct}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;