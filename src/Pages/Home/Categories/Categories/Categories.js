import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Shared/Loading/Loading';
import Category from '../Category/Category';

const Categories = () => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/category`, {
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

    return (
        <div className='my-8'>
            <h2 className="text-3xl text-center">Category</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items mt-8 mx-8'>
                {
                    categories &&
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;