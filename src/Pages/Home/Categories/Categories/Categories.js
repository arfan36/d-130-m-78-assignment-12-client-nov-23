import React, { useEffect, useState } from 'react';
import Category from '../Category/Category';

const Categories = () => {
    const [categories, set_categories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:7000/categories`)
            .then(res => res.json())
            .then(data => set_categories(data));
    }, []);


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center my-16 mx-8'>
            {
                categories.map(category => <Category
                    key={category._id}
                    category={category}
                ></Category>)
            }
        </div>
    );
};

export default Categories;