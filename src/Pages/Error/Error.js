import React from 'react';
import { useRouteError } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';

const Error = () => {
    const error = useRouteError();
    return (
        <div className='text-center'>
            <Navbar></Navbar>
            <h1 className='text-2xl font-bold'>Oh no! An Error Found</h1>
            <br />
            {
                error && (
                    <div>
                        <p style={{ color: 'red' }}>
                            {
                                error.statusText || error.message
                            }
                        </p>
                        <p style={{ color: 'red', fontSize: '50px' }}>
                            {
                                error.status
                            }
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default Error;