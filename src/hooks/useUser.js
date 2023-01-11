import { useEffect, useState } from "react";

export default function useUser(email) {
    const [loadUser, set_loadUser] = useState(null);
    const [isUserLoading, set_isUserLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:7000/users?email=${email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    set_loadUser(data);
                    set_isUserLoading(false);
                })
                .catch(err => console.error('err', err));
        }
    }, [email]);
    return [loadUser, isUserLoading];
};
