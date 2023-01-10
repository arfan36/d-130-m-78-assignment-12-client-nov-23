import { useEffect, useState } from "react";

export default function useBuyer(email) {
    const [buyer, set_buyer] = useState(null);
    const [isBuyerLoading, set_isBuyerLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:7000/users?email=${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                set_buyer(data);
                set_isBuyerLoading(false);
            })
            .catch(err => console.error('err', err));
    }, [email]);
    return [buyer, isBuyerLoading];
};
