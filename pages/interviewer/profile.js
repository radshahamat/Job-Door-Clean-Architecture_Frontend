import Link from "next/link";
import Layout from "../component/layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function profile() {
    const [data, setData] = useState([]);
    async function fetchdata() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/profile',
                {
                    withCredentials: true
                }
            );
            console.log(response);
            setData(response.data);
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchdata();
    }, [])
    return (
        <Layout>
            <div class="w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <div class="flex flex-col items-center pb-10">
                    {
                        data?.image != null
                            ? <img
                                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src={process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/getimage/' + data?.image}
                            />
                            : <img
                                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src={process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/getimage/No_image_available.png'}
                            />
                    }
                    {/* <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" /> */}
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                    <table>
                        <tbody>
                            <tr>
                                <td>id</td>
                                <td>{data?.id}</td>
                            </tr>
                            <tr>
                                <td>uname</td>
                                <td>{data?.uname}</td>
                            </tr>
                            <tr>
                                <td>mail</td>
                                <td>{data?.mail}</td>
                            </tr>
                            <tr>
                                <td>fname</td>
                                <td>{data?.fname}</td>
                            </tr>
                            <tr>
                                <td>lname</td>
                                <td>{data?.lname}</td>
                            </tr>
                            <tr>
                                <td>company</td>
                                <td>{data?.company}</td>
                            </tr>
                            <tr>
                                <td>position</td>
                                <td>{data?.position}</td>
                            </tr>
                            <tr>
                                <td>job_provider_id</td>
                                <td>{data?.job_provider_id}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex mt-4 md:mt-6">
                        {/* <Link href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</Link> */}
                        <Link href="update-image" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Image</Link>
                    </div>
                </div>
            </div>

        </Layout>
    )
}