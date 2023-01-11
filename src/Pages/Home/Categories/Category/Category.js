import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { categoryName, image } = category;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl image-full">
                <figure><img src={image} alt={categoryName} /></figure>
                <div className="card-body">
                    <h2 className="card-title justify-center mb-6">{categoryName}</h2>
                    <div className="card-actions justify-center">
                        <Link to={`/category/${categoryName}`}><button className="btn btn-primary">All Phone</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;