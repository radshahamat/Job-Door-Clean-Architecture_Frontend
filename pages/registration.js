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
        process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/registration',
        content,
        {
          withCredentials: true
        }
      )
      // console.log(e.response.response)
      // sessionStorage.setItem("username", content.username)
      router.push('/login')
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
  console.log(errors);

  return (
    <Layout>
      <div className='mx-auto my-auto max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <form onSubmit={handleSubmit(onSubmit)} class="max-w-xl">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          
          
          {/* fname */}
          <div class="mb-5">
            <label for="fname" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your fname
            </label>
            <input 
            type="text" placeholder="fname" {...register("fname", { required: { value: true, message: "fname is required" } })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.fname?.message}
            </p>
          </div>
          
          {/* lname */}
          <div class="mb-5">
            <label for="lname" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your lname
            </label>
            <input 
            type="text" placeholder="lname" {...register("lname", { required: { value: true, message: "lname is required" } })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.lname?.message}
            </p>
          </div>
          
          {/* company */}
          <div class="mb-5">
            <label for="company" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your company
            </label>
            <input 
            type="text" placeholder="company" {...register("company", { required: { value: true, message: "company is required" } })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.company?.message}
            </p>
          </div>
          
          {/* position */}
          <div class="mb-5">
            <label for="position" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your position
            </label>
            <input 
            type="text" placeholder="position" {...register("position", { required: { value: true, message: "position is required" } })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.position?.message}
            </p>
          </div>
          
          {/* job_provider_id */}
          <div class="mb-5">
            <label for="job_provider_id" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your job_provider_id
            </label>
            <input 
            type="number" placeholder="job_provider_id" {...register("job_provider_id", { required: { value: true, message: "job_provider_id is required" } })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.job_provider_id?.message}
            </p>
          </div>



          {/* mail */}
          <div class="mb-5">
            <label for="mail" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your mail
            </label>
            <input 
            type="email" placeholder="mail" {...register("mail", { required: { value: true, message: "mail is required" }, pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message:"Invalid email"} })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.mail?.message}
            </p>
          </div>

          {/* uname */}
          <div class="mb-5">
            <label for="uname" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your uname
            </label>
            <input 
            type="text" placeholder="uname" {...register("uname", { required: { value: true, message: "uname is required" }, pattern:{value:/[A-Za-z1-9]+$/, message:"uname can have alphabet and numeric letter only."} })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' 
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.uname?.message}
            </p>
          </div>

          {/* pass */}
          <div>
            <label for="pass" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
              Your pass
            </label>
            <input 
            type="password" placeholder="pass" {...register("pass", { required: { value: true, message: "pass is required" } })} 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.pass?.message}
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