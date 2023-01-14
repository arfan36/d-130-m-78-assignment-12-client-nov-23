import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useToken(email) {
    const [token, set_token] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/jwt?email=${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        // save token to local storage
                        localStorage.setItem('accessToken', data.accessToken);
                        set_token(data.accessToken);
                        toast.success('token add to local storage');
                    }
                })
                .catch(err => console.error('err', err));
        }
    }, [email]);
    return [token];

};

