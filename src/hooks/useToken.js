import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useToken(email) {
    const [token, set_token] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:7000/jwt?email=${email}`)
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
