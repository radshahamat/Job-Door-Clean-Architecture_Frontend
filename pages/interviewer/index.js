import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../component/layout";

export default function Home() {
  const [data, setData] = useState([]);
  async function fetchdata() {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/all',
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
    <>
      <Layout>
        <div>
          {/* <Link href={"/interviewer/interview-process"}>interview Process</Link> */}
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                  <th scope="col" class="px-6 py-3">Id</th>
                  <th scope="col" class="px-6 py-3">uname</th>
                  <th scope="col" class="px-6 py-3">mail</th>
                  <th scope="col" class="px-6 py-3">fname</th>
                  <th scope="col" class="px-6 py-3">lname</th>
                  <th scope="col" class="px-6 py-3">company</th>
                  <th scope="col" class="px-6 py-3">position</th>
                  <th scope="col" class="px-6 py-3">job_provider_id</th>
                  <th scope="col" class="px-6 py-3">image</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map(item => (
                    <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4">{item.id}</td>
                      <td class="px-6 py-4">{item.uname}</td>
                      <td class="px-6 py-4">{item.mail}</td>
                      <td class="px-6 py-4">{item.fname}</td>
                      <td class="px-6 py-4">{item.lname}</td>
                      <td class="px-6 py-4">{item.company}</td>
                      <td class="px-6 py-4">{item.position}</td>
                      <td class="px-6 py-4">{item?.job_provider_id}</td>
                      <td class="px-6 py-4">
                        {
                          item?.image != null
                            ? <img className=" h-20 w-20" src={process.env.NEXT_PUBLIC_api_root + 'jobInterviewer/getimage/' + item?.image} />
                            : <span>No image</span>
                        }

                      </td>
                      {/* <td>{item?.image}</td> */}
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
