import Link from "next/link";
import Layout from "../component/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function profile() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        console.log(data);
        // let content = {}
        // for (const key in data) {
        //     content[key] = data[key]
        // }
        const formdata = new FormData();
        formdata.append('file', data.file[0]);
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/image',
                formdata,
                {
                    'content-type': 'application/x-www-form-urlencoded',
                    withCredentials: true
                }
            )
            // console.log(e.response.response)
            // sessionStorage.setItem("username", content.username)
            router.push('/interviewer/profile')
        }
        catch (e) {
            console.log(e);
            try {
                setMessage(e.response.data.Message);
            }
            catch {
                setMessage("Network error");
            }
        }
    }
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

                    <div className='mx-auto my-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                        <form onSubmit={handleSubmit(onSubmit)} class="max-w-sm">
                            <h5 class="text-xl font-medium text-gray-900 dark:text-white">Change Image</h5>
                            {/* file */}
                            <div class="mb-5">
                                <label for="file" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                                    Your file
                                </label>
                                <input
                                    type="file" placeholder="file" {...register("file", { required: { value: true, message: "file is required" } })}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                />
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors?.file?.message}
                                </p>
                            </div>

                            <input className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit" />
                        </form>
                    </div>

                </div>
            </div>

        </Layout>
    )
}