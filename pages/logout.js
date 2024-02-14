import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function logout() {
    const [message, setMessage] = useState("Logging out");
    const router = useRouter();
    async function do_logout() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/logout',
                {
                    withCredentials: true
                }
            );
            console.log(response);
            sessionStorage.removeItem('username');
            setMessage("Successfully logged out")
            setTimeout(() => {
                router.push('/')
            }, 2000);
            //   setData(response.data);
            //   console.log(data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        do_logout();
    }, [])
    return (
        <>
            {message}
        </>
    )
}