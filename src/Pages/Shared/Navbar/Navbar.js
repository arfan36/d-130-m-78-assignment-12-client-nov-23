import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { AiOutlineMenuFold } from "react-icons/ai";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [loadUserType, set_loadUserType] = useState('');
    const navigate = useNavigate();

    // check userType
    axios.get(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/users?email=${user?.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(data => {
            set_loadUserType(data.data.userType);
        });

    const handleLogOut = () => {
        logOut().then(() => {
            navigate('/');
        }).catch((err) => {
            console.error('err', err);
        });
    };

    const menuItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/categories'}>Category</Link></li>
        <li><Link to={'/blog'}>Blog</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to={'/dashboard'}>DashBoard</Link></li>
                    <li><button onClick={handleLogOut}>Sign out</button></li>
                </>
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
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                    Buy Old Phone
                    {
                        user?.uid && loadUserType !== "not found" && <span className="badge badge- ml-1">
                            {loadUserType}
                        </span>
                    }
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button lg:hidden">
                <AiOutlineMenuFold />
            </label>
        </div>
    );
};

export default Navbar;