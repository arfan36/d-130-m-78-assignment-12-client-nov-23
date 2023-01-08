import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddAProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const imageHostKey = process.env.REACT_APP_imgBB_key;

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
            productName,
            productPrice,
            resalePrice,
            productCondition,
            category,
            productDescription,
            purchaseYear,
            uploadDate,
            mobileNumber,
            location
        } = data;
        console.log("🚀 ~ data", data);

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
                        productName,
                        productPrice,
                        resalePrice,
                        productCondition,
                        category,
                        productDescription,
                        purchaseYear,
                        phoneImage: imageData.data.url,
                        uploadDate,
                        sellerName: user?.displayName,
                        mobileNumber,
                        sellerEmail: user?.email,
                        location
                    };
                    console.log("🚀 ~ product", product);
                }
            });
    };

    return (
        <div className='w-96 p-7'>
            <h2 className="text-3xl">Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                {/* #1 Product Name ------------------------------------ */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#1 Product Name</span>
                    </label>
                    <input type="text"
                        {
                        ...register("productName", {
                            required: "Product Name is Required"
                        })
                        }
                        placeholder="product name" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.productName &&
                        <p className='text-error'>{errors.productName?.message}</p>
                    }
                </div>
                {/* #2 Product Price -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#2 Product Price ($)</span>
                    </label>
                    <input type="number"
                        {
                        ...register("productPrice", {
                            required: "Product Price is Required"
                        })
                        }
                        placeholder="product price" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.productPrice &&
                        <p className='text-error'>{errors.productPrice?.message}</p>
                    }
                </div>
                {/* #3 Product Resale Price -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#3 Product Resale Price ($)</span>
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
                        {...register("category")}
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
                {/* #7 Year of Purchase -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#7 Year of Purchase</span>
                    </label>
                    <input type="date"
                        {
                        ...register("purchaseYear", {
                            required: "Purchasing Year is Required"
                        })
                        }
                        placeholder="year of purchase" className="input input-bordered w-full max-w-xs" />
                    {
                        errors.purchaseYear &&
                        <p className='text-error'>{errors.purchaseYear?.message}</p>
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
                {/* #9 Upload date ----------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#9 Upload date</span>
                    </label>
                    <input type="text"
                        className="input input-bordered w-full max-w-xs"
                        defaultValue={new Date().toJSON().slice(0, 10)} disabled />
                    {
                        errors.uploadDate &&
                        <p className='text-error'>{errors.uploadDate?.message}</p>
                    }
                </div>

                {/* #10 Seller Name -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#10 Seller Name</span>
                    </label>
                    <input type="text"
                        {
                        ...register("sellerName")
                        }
                        placeholder="seller name"
                        className="input input-bordered w-full max-w-xs"
                        defaultValue={user?.displayName} disabled />
                    {
                        errors.sellerName &&
                        <p className='text-error'>{errors.sellerName?.message}</p>
                    }
                </div>
                {/* #11 Seller Mobile Number -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#11 Seller Mobile Number</span>
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
                {/* #12 Seller Email Address ----------------------------------- */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#12 Seller Email Address</span>
                    </label>
                    <input type="email"
                        {
                        ...register("sellerEmail")
                        }
                        placeholder="seller email address"
                        className="input input-bordered w-full max-w-xs"
                        defaultValue={user?.email} disabled />
                    {
                        errors.sellerEmail &&
                        <p className='text-error'>{errors.sellerEmail?.message}</p>
                    }
                </div>
                {/* #13 Location -----------------------------------*/}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">#13 Location</span>
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