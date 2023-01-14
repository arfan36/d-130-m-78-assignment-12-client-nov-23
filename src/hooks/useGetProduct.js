import { useEffect } from "react";
import { useState } from "react";

export default function useGetProduct(id) {
    const [product, set_product] = useState(null);
    const [isLoading, set_isLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/product/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("🚀 ~ data", data);
                    set_product(data);
                    set_isLoading(false);
                })
                .catch(err => console.error('err', err));
        }
    }, [id]);
    return [product, isLoading];

};
