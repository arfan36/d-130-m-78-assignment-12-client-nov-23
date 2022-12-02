import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, providerLogin } = useContext(AuthContext);
    const [signUpError, set_signUpError] = useState('');
    const [createUserEmail, set_createUserEmail] = useState('');
    // token

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // handle Login
    const handleSignUp = (data) => {
        console.log(data);
        const { name, email, password } = data;
        set_signUpError('');

        // create user with email and password
        createUser(email, password).then((result) => {
            const { user } = result;
            console.log("🚀 ~ user", user);
            toast.success('user created successfully');
            const userInfo = {
                displayName: name
            };

            // update user info
            updateUser(userInfo).then(() => {
                toast.success('user info updated');

                // save user info


            }).catch((err) => {
                console.error('err', err);
                set_signUpError(err.message);
            });
        }).catch((err) => {
            console.error('err', err);
            set_signUpError(err.message);
        });

        // // signIn With Email And Password
        // signIn(email, password).then((result) => {
        //     const { user } = result;
        //     console.log("🚀 ~ user", user);

        //     // get user token
        //     set_loginUserEmail(email);

        // }).catch((err) => {
        //     console.error('err', err);
        //     set_loginError(err.message);
        // });
    };

    // handle google login
    const handleGoogleLogin = () => {
        set_signUpError('');
        providerLogin().then((result) => {
            const { user } = result;
            console.log("🚀 ~ user", user);

            // get user token
            set_createUserEmail(user.email);

        }).catch((err) => {
            console.error('err', err);
            set_signUpError(err.message);
        });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleSignUp)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"
                                        {
                                        ...register("name", {
                                            required: "Name is Required"
                                        })
                                        }
                                        placeholder="name" className="input input-bordered" />
                                    {
                                        errors.name &&
                                        <p className='text-error'>{errors.name?.message}</p>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"
                                        {
                                        ...register("email", {
                                            required: "Email Address is Required"
                                        })
                                        }
                                        placeholder="email" className="input input-bordered" />
                                    {
                                        errors.email &&
                                        <p className='text-error'>{errors.email?.message}</p>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"
                                        {
                                        ...register("password", {
                                            required: "Password is Required",
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be 6 character'
                                            },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                                message: "Password must have uppercase, number and special character"
                                            }
                                        })
                                        }
                                        placeholder="password" className="input input-bordered" />
                                    {
                                        errors.password &&
                                        <p className='text-error'>{errors.password?.message}</p>
                                    }
                                    <label className="label">
                                        <Link to="" className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">signUp</button>
                                </div>
                                <div>
                                    {
                                        signUpError &&
                                        <p className='text-error'>{signUpError}</p>
                                    }
                                </div>
                            </form>
                            <p>Already have a Account? Please <Link className='text-primary' to={'/login'}>login</Link></p>
                            <div className="divider">OR</div>
                            <div onClick={handleGoogleLogin} className="btn btn-primary btn-outline w-full">CONTINUE WITH GOOGLE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;