import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../Pages/Shared/Loading/Loading';
import Navbar from '../Pages/Shared/Navbar/Navbar';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    // check user type
    const { data: loadUser, isLoading } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/users?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-- Page content here --> */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {
                            user?.uid && loadUser.userType === "buyer" &&
                            <>
                                <li><Link to={'/dashboard/buyer-myOrder'}>My Orders</Link></li>
                                <li><Link to={'/dashboard/buyer-wishlist'}>WishList</Link></li>
                            </>
                        }
                        {
                            user?.uid && loadUser.userType === "seller" &&
                            <>
                                <li><Link to={'/dashboard/seller-addAProduct'}>Add A Product</Link></li>
                                <li><Link to={'/dashboard/seller-myProducts'}>My Products</Link></li>
                                <li><Link to={'/dashboard/seller-myBuyers'}>My Buyers</Link></li>
                            </>
                        }
                        {
                            user?.uid && loadUser.userType === "admin" &&
                            <>
                                <li><Link to={'/dashboard/admin-allSellers'}>All Sellers</Link></li>
                                <li><Link to={'/dashboard/admin-allBuyers'}>All Buyers</Link></li>
                                <li><Link to={'/dashboard/admin-reportedItems'}>Reported Items</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;