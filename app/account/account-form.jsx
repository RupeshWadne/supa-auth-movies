'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import axios from 'axios'
import { queryClient } from '../lib/reactQueryClient'

const API_BASE_URL = 'https://api.themoviedb.org/3/discover' // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // Add common headers here if needed
})

const fetchData = async () => {
  const response = await axiosInstance.get('/movie', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2MzOWYwMmMxODY2ODBiYmI1MzAzOTYyYmY4Y2RlOCIsInN1YiI6IjY0Yzc4ZWQyNjNlNmZiMDExYjNiMzQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L3vUhNyzZeySPWxjM_hwyxCEXYnl_U9Qn5_jQ4R5cKg',
    },
  })
  return response.data
}

export default function AccountForm({ session }) {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery('data', fetchData)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error fetching data</div>
  }

  if (!session) {
    console.log(session)
    return (
      <div className="flex flex-col items-center justify-center mt-80">
        <h1 className="text-center">For viewing movies. Please Sign In!!</h1>
        <button className="mt-2 border-2 border-white p-2 rounded-xl" onClick={() => router.push('/')}>Sign In</button>
      </div>
    )
  }
  if (session) {
    console.log(session)
    console.log(data)
    return (
      <div>
        <div>
          <h1 className="text-center font-bold mt-5">Movies</h1>
          <div>
            <form action="/auth/signout" method="post">
              <button className="border-2 border-white p-2 rounded-xl flex justify-end mt-2 m-auto" type="submit">
                Sign out
              </button>
            </form>
          </div>
          <ul className="grid grid-cols-4 gap-4 m-8">
            {data.results.map((post) => (
              <div key={post.id}>
                <div className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 w-[22rem] p-2 rounded-lg mb-8 flex flex-col items-center border-2 border-green-500 shadow-[5px_5px_0px_1px_rgba(40,28,120)]">
                  <div className="flex flex-col h-80 w-full overflow-hidden relative">
                    <img
                      width="200"
                      height="200"
                      className="w-full h-full left-0 top-0 object-cover absolute"
                      src={`https://image.tmdb.org/t/p/w500/${post.poster_path}`}
                      alt="Cover Picture"
                    />
                  </div>
                  <div className="flex w-full flex-row justify-between overflow-hidden">
                    <p className="cursor-pointer text-black font-bold text-lg flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200">
                      {post.title}
                    </p>

                    <p className="text-emerald-600 m-4 text-sm font-medium text-center">
                      {' '}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
