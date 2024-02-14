import { env } from "@/next.config";
import Layout from "@/pages/component/layout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  async function fetchdata() {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_api_root + 'interview-process',
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
  async function deletedata(id) {
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_api_root + 'interview-process/' + id,
        {
          withCredentials: true
        }
      );
      console.log(response);
      fetchdata();
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [])
  return (
    <>
      <Layout>
        <div>
          {/* <Link href={"/interviewer"}>Index</Link><br /> */}
          {/* <Link href={"/interviewer/interview-process/add"}>Add interview Process</Link> */}

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                  <th scope="col" class="px-6 py-3">Id</th>
                  <th scope="col" class="px-6 py-3">job_provider_id</th>
                  <th scope="col" class="px-6 py-3">job_seeker_id</th>
                  <th scope="col" class="px-6 py-3">date</th>
                  <th scope="col" class="px-6 py-3">venue</th>
                  <th scope="col" class="px-6 py-3">interview_steps</th>
                  <th scope="col" class="px-6 py-3">interview_type</th>
                  <th scope="col" class="px-6 py-3">interviewer</th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(item => (
                    <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4">{item.id}</td>
                      <td class="px-6 py-4">{item.job_provider_id}</td>
                      <td class="px-6 py-4">{item.job_seeker_id}</td>
                      <td class="px-6 py-4">{item.date}</td>
                      <td class="px-6 py-4">{item.venue}</td>
                      <td class="px-6 py-4">{item.interview_steps}</td>
                      <td class="px-6 py-4">{item.interview_type}</td>
                      <td class="px-6 py-4">{item?.interviewer?.id}</td>
                      <th class="px-6 py-4">
                        <Link href={"/interviewer/interview-process/update/" + item.id}>Update</Link> |
                        <button onClick={() => deletedata(item.id)}>delete</button>
                      </th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </Layout>

    </>
  )
}
