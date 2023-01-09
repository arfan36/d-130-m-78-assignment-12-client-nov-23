import React, { useEffect, useState } from 'react';
import Category from '../Category/Category';

const Categories = () => {
    const [categories, set_categories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:7000/category`)
            .then(res => res.json())
            .then(data => set_categories(data));
    }, []);


    return (
        <div className='mt-16'>
            <h2 className="text-3xl text-center">Category</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-16 mt-8 mx-8'>
                {
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