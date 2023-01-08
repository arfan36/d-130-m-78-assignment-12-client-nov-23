import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddAProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imgBB_key;
    const navigate = useNavigate();

    // ─── Load Only Category Name ────────────────────────────────
    const { data: categories, isLoading, } = useQuery({
        queryKey: ['category-names'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:7000/category-names`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    // ─── Handle Add A Product ────────────────────────────────────────────
    const handleAddProduct = (data) => {
        const {
            phoneName,
            originalPrice,
            resalePrice,
            productCondition,
            categoryName,
            productDescription,
            purchaseDate,
            mobileNumber,
            location
        } = data;

        const image = data.phoneImage[0];

        // ─── Upload Image To ImageBB ─────────────────────────────────
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    // ─── Product Info ────────────────────
                    const product =
                    {
                        phoneName,
                        originalPrice,
                        resalePrice,
                        productCondition,
                        categoryName,
                        productDescription,
                        purchaseDate,
                        phoneImage: imageData.data.url,
                        postedTime: new Date().toJSON().slice(0, 10),
                        sellerName: user?.displayName,
                        mobileNumber,
                        sellerEmail: user?.email,
                        location
                    };
                    console.log("🚀 ~ product", product);

                    // save product info to the database
                    fetch(`http://localhost:7000/products`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log("🚀 ~ result", result);
                            toast.success(`${phoneName} is added successfully`);
                            navigate('/dashboard/seller-myProducts');
                        });
                }
            });
    };

    return (
        <div className='w-96 p-7'>
            <h2 className="text-3xl">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                {/* #1 Phone Name ------------------------------------ */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#1 Phone Name</span>
                    </label>
                    <input type="text"
                        {
                        ...register("phoneName", {
                            required: "Phone Name is Required"
                        })
                        }
                        placeholder="product name" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.phoneName &&
                        <p className='text-error'>{errors.phoneName?.message}</p>
                    }
                </div>
                {/* #2 Original Price -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#2 Original Price ($)</span>
                    </label>
                    <input type="number"
                        {
                        ...register("originalPrice", {
                            required: "Original Price is Required"
                        })
                        }
                        placeholder="product price" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.originalPrice &&
                        <p className='text-error'>{errors.originalPrice?.message}</p>
                    }
                </div>
                {/* #3 Resale Price -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#3 Resale Price ($)</span>
                    </label>
                    <input type="number"
                        {
                        ...register("resalePrice", {
                            required: "Product Resale Price is Required"
                        })
                        }
                        placeholder="product resale price" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.resalePrice &&
                        <p className='text-error'>{errors.resalePrice?.message}</p>
                    }
                </div>
                {/* #4 Product Condition -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#4 Product Condition (excellent/good/fair)</span>
                    </label>
                    <select
                        {...register("productCondition")}
                        className="input input-bordered w-full max-w-xs"
                    >
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                    </select>
                </div>

                {/* #5 Product Category -------------------------------------- */}
                <div className='form-control w-full max-w-xs'>
                    <label className="label">
                        <span className="label-text">#5 Product Category</span>
                    </label>
                    <select
                        {...register("categoryName")}
                        className="input input-bordered w-full max-w-xs"
                    >
                        {
                            categories.map(category => <option
                                key={category._id}
                                value={category.categoryName}
                            >
                                {category.categoryName}
                            </option>)
                        }
                    </select>
                </div>
                {/* #6 Product Description -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#6 Product Description</span>
                    </label>
                    <textarea type="text"
                        {
                        ...register("productDescription", {
                            required: "Product Description is Required"
                        })
                        }
                        placeholder="about product" className="textarea textarea-bordered w-full max-w-xs" />
                    {
                        errors.productDescription &&
                        <p className='text-error'>{errors.productDescription?.message}</p>
                    }
                </div>
                {/* #7 Purchasing Date -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#7 Purchasing Date</span>
                    </label>
                    <input type="date"
                        {
                        ...register("purchaseDate", {
                            required: "Purchasing Date is Required"
                        })
                        }
                        placeholder="year of purchase" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.purchaseDate &&
                        <p className='text-error'>{errors.purchaseDate?.message}</p>
                    }
                </div>
                {/* #8 Phone Image ----------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#8 Phone Image</span>
                    </label>
                    <input type="file"
                        {
                        ...register("phoneImage", {
                            required: "Phone image is Required"
                        })
                        }
                        placeholder="phone image" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.phoneImage &&
                        <p className='text-error'>{errors.phoneImage?.message}</p>
                    }
                </div>
                {/* #9 Seller Mobile Number -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#9 Seller Mobile Number</span>
                    </label>
                    <input type="number"
                        {
                        ...register("mobileNumber", {
                            required: "Mobile Number is Required"
                        })
                        }
                        placeholder="seller mobile number" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.mobileNumber &&
                        <p className='text-error'>{errors.mobileNumber?.message}</p>
                    }
                </div>
                {/* #10 Location -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#10 Location</span>
                    </label>
                    <input type="text"
                        {
                        ...register("location", {
                            required: "Location is Required"
                        })
                        }
                        placeholder="location" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.location &&
                        <p className='text-error'>{errors.location?.message}</p>
                    }
                </div>

                <div className="form-control w-full max-w-xs mt-6">
                    <button className="btn btn-primary">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddAProduct;