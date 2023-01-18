import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import data from '../data/courses.json'

function CoursePage() {
  let { id } = useParams();
    const course = data.filter(data =>
        data.id.toLowerCase().includes(id.toLowerCase())
      );
  return (
    course && course.length>0 && course.map((item)=>
      <div className='h-100vh w-100vw'>
        <div className="w-full h-32 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex">
          <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.id}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.name}</p>
          </div>
          <div>
            <a href='/'>Home</a>
          </div>
        </div>
        <div className="w-full flex h-16 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p className="font-normal text-gray-700 dark:text-gray-400">Professor</p>
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.professor}</h5>
        </div>
      </div>
    )
  )
}

export default CoursePage
