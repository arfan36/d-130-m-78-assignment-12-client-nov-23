import { useEffect } from "react";
import { useState } from "react";

export default function useBuyer(email) {
    const [isBuyer, set_isBuyer] = useState(false);
    const [isBuyerLoading, set_isBuyerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/users/buyer/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json().then(data => {
                console.log(data);
                set_isBuyer(data.isBuyer);
                set_isBuyerLoading(false);
            })).catch(err => console.error('err', err));
        }
    }, [email]);
    return [isBuyer, isBuyerLoading];
};
