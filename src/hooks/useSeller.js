import { useEffect } from "react";
import { useState } from "react";

export default function useSeller(email) {
    const [isSeller, set_isSeller] = useState(false);
    const [isSellerLoading, set_isSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:7000/users/seller/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                set_isSeller(data.isSeller);
                set_isSellerLoading(false);
            }).catch(err => console.error('err', err));
        }
    }, [email]);
    return [isSeller, isSellerLoading];
};
