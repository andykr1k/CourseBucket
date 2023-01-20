import { useState, useEffect, useCallback } from 'react'
import data from '../data/courses.json'
import { motion } from 'framer-motion';
import { supabase } from '../db/supabase'

function SearchPage() {
  const [search, setSearch] = useState('');
  const [supadata, setSupadata] = useState([]);

  const fetchCourses = useCallback(async () => {
    const { data: supadata } = await supabase
      .from('Courses')
      .select('*')
      setSupadata(supadata);
  });
  
  const filteredCourses = data.filter(data =>
    data.name.toLowerCase().includes(search.toLowerCase()) ||
    data.id.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCourses = filteredCourses.sort();
  
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="">
      <h1 className="text-5xl md:text-7xl font-bold p-10 pb-0 text-center">
        CourseBucket
      </h1>

    <form className='mx-10 md:mx-48 p-10 pb-8'>
      <label className="mb-2 text-sm font-medium sr-only text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                </path>
              </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search by Name or Course ID" required onChange={(e) => setSearch(e.target.value)}></input>
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
      </div>
    </form>
    <div>
    { search == ''
    ?
      <h1 className="text-2xl md:text-4xl font-normal text-center text-gray-600 pb-5">Explore</h1>
    :
      <h1 className="text-2xl md:text-4xl font-normal text-center text-gray-600">Results</h1>
    }
    </div>
    <div className='grid place-items-center grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 m-10 lg:m-36 lg:mt-5 mt-2'>
    { search == ''
    ?
    supadata && supadata.length>0 && supadata.map((item)=>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full h-36 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div>
          <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.course_id}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-nowrap overflow-x-auto scrollbar-hide">{item.course_name}</p>
        </div>
        <div className=''>
          <a href={item.course_id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Learn more
              <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>
        </div>
        </motion.div>
       )
    :
      sortedCourses && sortedCourses.length>0 && sortedCourses.map((item)=>
        <div className="w-full h-32 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.id}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.name}</p>
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Learn more
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
        </div>

       )
     }
    </div>

    </div>
  )
}

export default SearchPage
