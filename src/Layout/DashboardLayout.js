import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
// import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    // const [isAdmin] = useAdmin(user?.email);
    const [loadUserType, set_loadUserType] = useState('');

    // check user type
    axios.get(`http://localhost:7000/users?email=${user?.email}`)
        .then(data => {
            set_loadUserType(data.data.userType);
        });

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
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {
                            user?.uid && loadUserType === "buyer" &&
                            <>
                                <li><Link to={'/dashboard/buyer-myOrder'}>My Orders</Link></li>
                                <li><Link to={'/dashboard/buyer-wishlist'}>WishList</Link></li>
                                <li><Link to={'/dashboard/buyer-dashboard'}>Dashboard</Link></li>
                            </>
                        }
                        {
                            user?.uid && loadUserType === "seller" &&
                            <>
                                <li><Link to={'/dashboard/seller-addAProduct'}>Add A Product</Link></li>
                                <li><Link to={'/dashboard/seller-myProducts'}>My Products</Link></li>
                                <li><Link to={'/dashboard/seller-myBuyers'}>My Buyers</Link></li>
                            </>
                        }
                        {
                            user?.uid && loadUserType === "admin" &&
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