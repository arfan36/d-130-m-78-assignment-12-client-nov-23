import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, providerLogin } = useContext(AuthContext);
    const [loginError, set_loginError] = useState('');
    const [loginUserEmail, set_loginUserEmail] = useState('');

    // get user token
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // if token saved to local storage
    if (token) {
        navigate(from, { replace: true });
    }

    // handle Login
    const handleLogin = (data) => {
        console.log(data);
        const { email, password } = data;
        set_loginError('');

        // signIn With Email And Password
        signIn(email, password).then((result) => {
            const { user } = result;
            console.log("🚀 ~ user", user);
            toast.success('successfully log in');

            // get user token
            set_loginUserEmail(email);

        }).catch((err) => {
            console.error('err', err);
            set_loginError(err.message);
        });

    };

    // save User info
    const saveUser = (name, email, userType) => {
        const user = { name, email, userType };
        fetch(`http://localhost:7000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // get user token
                set_loginUserEmail(email);
            })
            .catch(err => console.error('err', err));
    };

    // handle google login
    const handleGoogleLogin = () => {
        set_loginError('');
        providerLogin().then((result) => {
            const { user } = result;
            const { displayName, email } = user;
            console.log("🚀 ~ user", user);

            // save user
            saveUser(displayName, email, "buyer");

        }).catch((err) => {
            console.error('err', err);
            set_loginError(err.message);
        });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login Now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"
                                        {
                                        ...register("email", {
                                            required: "Email Address is Required"
                                        })
                                        }
                                        placeholder="email" className="input input-bordered w-full max-w-xs" />
                                    {
                                        errors.email &&
                                        <p className='text-error'>{errors.email?.message}</p>
                                    }
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"
                                        {
                                        ...register("password", {
                                            required: "Password is Required",
                                            minLength: { value: 6, message: 'Password must be 6 character or longer' }
                                        })
                                        }
                                        placeholder="password" className="input input-bordered w-full max-w-xs" />
                                    {
                                        errors.password &&
                                        <p className='text-error'>{errors.password?.message}</p>
                                    }
                                    <label className="label">
                                        <Link to="" className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>

                                <div className="form-control w-full max-w-xs mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>

                                <div>
                                    {
                                        loginError &&
                                        <p className='text-error'>{loginError}</p>
                                    }
                                </div>
                            </form>
                            <p>New to here? <Link to={'/signup'} className="text-primary">Create New Account</Link></p>
                            <div className="divider">OR</div>
                            <div onClick={handleGoogleLogin} className="btn btn-primary btn-outline w-full">Buyer Login with Google</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;