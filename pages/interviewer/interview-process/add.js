import Layout from '@/pages/component/layout';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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
        process.env.NEXT_PUBLIC_api_root + 'interview-process',
        content,
        {
          withCredentials: true
        }
      )
      router.push('/interviewer/interview-process')
    }
    catch (e) {
      console.log(e)
      try {
        setMessage(e.response.data.Message);
      }
      catch {
        setMessage("Network error");
      }
    }
  }
  console.log(errors);

  return (
    <>
      <Layout>
        {/* <Link href={"/interviewer/interview-process"}>Index</Link> */}
        <div className='w-full mx-auto max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
          <form onSubmit={handleSubmit(onSubmit)} class="max-w-sm mx-auto">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">Create interview</h5>
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

            {/* job_seeker_id */}
            <div class="mb-5">
              <label for="job_seeker_id" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Your job_seeker_id
              </label>
              <input
                type="number" placeholder="job_seeker_id" {...register("job_seeker_id", { required: { value: true, message: "job_seeker_id is required" } })}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors?.job_seeker_id?.message}
              </p>
            </div>

            {/* date */}
            <div class="mb-5">
              <label for="date" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Your date
              </label>
              <input
                type="date" placeholder="date" {...register("date", { required: { value: true, message: "date is required" } })}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors?.date?.message}
              </p>
            </div>

            {/* venue */}
            <div class="mb-5">
              <label for="venue" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Your venue
              </label>
              <input
                type="text" placeholder="venue" {...register("venue", { required: { value: true, message: "venue is required" }, pattern: { value: /[A-Za-z]+$/, message: "Vanue name can not contain white space" } })}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors?.venue?.message}
              </p>
            </div>

            {/* interview_steps */}
            <div class="mb-5">
              <label for="interview_steps" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Your interview_steps
              </label>
              <input
                type="number" placeholder="interview_steps" {...register("interview_steps", { required: { value: true, message: "interview_steps is required" } })}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors?.interview_steps?.message}
              </p>
            </div>

            {/* interview_type */}
            <div class="mb-5">
              <label for="interview_type" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
                Your interview_type
              </label>
              <input
                type="text" placeholder="interview_type" {...register("interview_type", { required: { value: true, message: "interview_type is required" } })}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              />
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors?.interview_type?.message}
              </p>
            </div>

            {/* submit */}
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {message}
            </p>
            <input className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit" />
          </form>
        </div>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='job_provider_id'>job_provider_id</label>
          <input type="number" placeholder="job_provider_id" {...register("job_provider_id", { required: { value: true, message: "job_provider_id is required" } })} />
          {errors?.job_provider_id?.message}<br />

          <label htmlFor='job_seeker_id'>job_seeker_id</label>
          <input type="number" placeholder="job_seeker_id" {...register("job_seeker_id", { required: { value: true, message: "job_seeker_id is required" } })} />
          {errors?.job_seeker_id?.message}<br />

          <label htmlFor='date'>date</label>
          <input type="date" placeholder="date" {...register("date", { required: { value: true, message: "date is required" } })} />
          {errors?.date?.message}<br />

          <label htmlFor='venue'>venue</label>
          <input type="text" placeholder="venue" {...register("venue", { required: { value: true, message: "venue is required" } })} />
          {errors?.venue?.message}<br />

          <label htmlFor='interview_steps'>interview_steps</label>
          <input type="number" placeholder="interview_steps" {...register("interview_steps", { required: { value: true, message: "interview_steps is required" } })} />
          {errors?.interview_steps?.message}<br />

          <label htmlFor='interview_type'>interview_type</label>
          <input type="text" placeholder="interview_type" {...register("interview_type", { required: { value: true, message: "interview_type is required" } })} />
          {errors?.interview_type?.message}<br />

          <input type="hidden" value={1} placeholder="interviewer" {...register("interviewer", { required: { value: true, message: "interviewer is required" } })} />

          <input type="submit" />
        </form> */}
      </Layout>
    </>
  );
}