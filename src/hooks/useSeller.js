import { useEffect, useState } from "react";

export default function useSeller(email) {
    const [seller, set_seller] = useState(null);
    const [isSellerLoading, set_isSellerLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:7000/users?email=${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                set_seller(data);
                set_isSellerLoading(false);
            })
            .catch(err => console.error('err', err));
    }, [email]);
    return [seller, isSellerLoading];
};
