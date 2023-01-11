import { useEffect } from "react";
import { useState } from "react";

export default function useGetProduct(id) {
    const [product, set_product] = useState(null);
    const [isLoading, set_isLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:7000/product/${id}`)
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
