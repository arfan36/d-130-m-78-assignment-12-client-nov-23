import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [loadUserType, set_loadUserType] = useState('');

    // check userType
    axios.get(`http://localhost:7000/users?email=${user?.email}`)
        .then(data => {
            set_loadUserType(data.data.userType);
        });

    const handleLogOut = () => {
        logOut().then(() => {
        }).catch((err) => {
            console.error('err', err);
        });
    };

    const menuItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/categories'}>Category</Link></li>
        {
            user?.uid && loadUserType === "buyer" &&
            <>
                <li><Link to={'/buyer-myOrder'}>My Orders</Link></li>
                <li><Link to={'/buyer-wishlist'}>WishList</Link></li>
                <li><Link to={'/buyer-dashboard'}>Dashboard</Link></li>
            </>
        }
        {
            user?.uid && loadUserType === "seller" &&
            <>
                <li><Link to={'/seller-addAProduct'}>Add A Product</Link></li>
                <li><Link to={'/seller-myProduct'}>My Products</Link></li>
                <li><Link to={'/seller-myBuyers'}>My Buyers</Link></li>
            </>
        }
        {
            user?.uid && loadUserType === "admin" &&
            <>
                <li><Link to={'/admin-allSellers'}>All Sellers</Link></li>
                <li><Link to={'/admin-allBuyers'}>All Buyers</Link></li>
                <li><Link to={'/admin-reportedItems'}>Reported Items</Link></li>
            </>
        }
        <li><Link to={'/about'}>About</Link></li>
        <li><Link to={'/blog'}>Blog</Link></li>
        {
            user?.uid ?
                <li><button onClick={handleLogOut}>Sign out</button></li>
                : <li><Link to={'/login'}>Login</Link></li>
        }
    </>;

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">Buy Old Phone</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;