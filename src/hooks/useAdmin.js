import { useEffect } from "react";
import { useState } from "react";

export default function useAdmin(email) {
    const [isAdmin, set_isAdmin] = useState(false);
    const [isAdminLoading, set_isAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://d-130-1-m-78-assignment-12-server-nov-23.vercel.app/users/admin/${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    set_isAdmin(data.isAdmin);
                    set_isAdminLoading(false);
                });
        }
    }, [email]);
    return [isAdmin, isAdminLoading];
};
