import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from './component/layout';

export default function App() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log(data);
    let content = {}
    for (const key in data) {
      content[key] = data[key]
    }
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/login',
        content,
        {
          withCredentials: true
        }
      )
      // console.log(e.response.response)
      sessionStorage.setItem("username", content.username)
      router.push('/')
    }
    catch (e) {
      console.log(e);
      try{
        setMessage(e.response.data.Message);
      }
      catch{
        setMessage("Network error");
      }
    }
  }
  // console.log(errors);

  return (
    <Layout>
      <div className='mx-auto my-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form onSubmit={handleSubmit(onSubmit)} class="max-w-sm">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          {/* username */}
          <div class="mb-5">
            <label for="username" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your username
            </label>
            <input 
            type="text" placeholder="username" {...register("username", { required: { value: true, message: "username is required" } })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.username?.message}
            </p>
          </div>

          {/* password */}
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your password
            </label>
            <input 
            type="password" placeholder="password" {...register("password", { required: { value: true, message: "password is required" } })} 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.password?.message}
            </p>
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {message}
          </p>
          <input className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit" />
        </form>
      </div>
    </Layout>
  );
}