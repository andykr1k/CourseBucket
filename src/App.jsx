import { useState, useEffect } from 'react'
import data from './data/courses.json'

function App() {

  return (
    <div className="">
      <h1 className="text-5xl md:text-7xl font-bold p-10 pb-0 text-center ">
        CourseBucket
      </h1>
      

    <form className='mx-10 md:mx-48 p-10'>   
      <label for="default-search" class="mb-2 text-sm font-medium sr-only text-white">Search</label>
      <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                </path>
              </svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search by Name or Course ID" required></input>
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
      </div>
    </form>

    <div className='grid place-items-center grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 m-3'>
    {
       data && data.length>0 && data.map((item)=>
       <div className='w-full h-32 bg-white/25 rounded-lg p-5'>
        <h2 className='text-lg'>{item.id}</h2>
        <p className='text-sm'>{item.name}</p>
       </div>
       )
     }
    </div>

    </div>
  )
}

export default App
