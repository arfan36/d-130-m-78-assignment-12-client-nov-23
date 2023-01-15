import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Navbar from '../Navbar/Navbar';

const DisplayError = () => {
    const { user, logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    // log out handler
    const handleLogOut = () => {
        logOut().then(() => {
            navigate('/');
            toast.success('successfully LogOut');
        }).catch((err) => {
            console.error('err', err);
        });
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>Oh no! An Error Found</h1>
                {
                    user?.uid &&
                    <h4 className="text-3xl mb-4">
                        Please <button className='btn btn-sm btn-primary' onClick={handleLogOut}>Sign Out</button> and log back in
                    </h4>
                }
                <p style={{ color: 'red' }}> {error.statusText || error.message} </p>
                {
                    error.status === 404 ?
                        <div className='flex justify-center mt-5'>
                            <img className='object-contain' src="https://i.ibb.co/MSHkYSS/404-not-found-Medium.jpg" alt="404 not found" />
                        </div>
                        :
                        <>
                            <p style={{ color: 'red', fontSize: '50px' }}> {error.status} </p>
                            <div className='flex justify-center'>
                                <img className='object-contain' src="https://i.ibb.co/3STyjH6/Opp-not-found.jpg" alt="not found" />
                            </div>
                        </>
                }


            </div>
        </>
    );
};

export default DisplayError;