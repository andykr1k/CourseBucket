import { useState, useEffect, useCallback } from 'react'
import data from '../data/courses.json'
import { motion } from 'framer-motion';
import { supabase } from '../db/supabase'
import { AddCourseModal } from '../components';
import { AiOutlinePlusCircle, AiOutlineCloseCircle, AiFillCloseCircle } from "react-icons/ai";
import logo_light from '../assets/logo_light.png'
import logo_dark from '../assets/logo_dark.png'

function SearchPage() {
  const [search, setSearch] = useState('');
  const [supadata, setSupadata] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchCourses = useCallback(async () => {
      const { data: supadata } = await supabase
        .from('Courses')
        .select('*')
      
      const unique = [...new Map(supadata.map((m) => [m.course_id, m])).values()];
      setSupadata(unique)
  });

  const filteredCourses = supadata.filter(data =>
    data.course_name.toLowerCase().includes(search.toLowerCase()) ||
    data.course_id.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCourses = filteredCourses.sort();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="">
      <button className='fixed bottom-0 right-0 m-3' onClick={() => setModal(true)}> <AiOutlinePlusCircle size={36}/></button>
      <div className='absolute z-10 w-full h-modal pointer-events-none'>
      {
        modal == true
        ?
        <div className='pointer-events-auto'>
          <AddCourseModal close={setModal}/>
        </div>
        :
        <div className=''></div>
      }
      </div>
      <div className='flex justify-center items-center p-5 pb-0'>
        <img src={logo_dark} className='w-52 md:w-72'></img>
      </div>
    <form className='mx-10 md:mx-48 p-10 pb-8 pt-8'>
      <label className="mb-2 text-sm font-medium sr-only text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                  </path>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search Course ID" required onChange={(e) => setSearch(e.target.value)}></input>
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
        </div>
      </form>
      <div>
      { search == ''
      ?
        <h1 className="text-2xl md:text-4xl font-normal text-center text-gray-600 pb-5">Explore</h1>
      :
        <h1 className="text-2xl md:text-4xl font-normal text-center text-gray-600 pb-5">Results</h1>
      }
      </div>
      <div className='grid place-items-center grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 m-10 lg:m-36 lg:mt-5 mt-2'>
      { search == ''
      ?
      supadata && supadata.length>0 && supadata.map((item)=>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full h-42 p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className='overflow-x-hidden'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.course_id}</h5>
            {
              item.course_name.length > 20 
              ?
              <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-nowrap scrollbar-hide">{item.course_name}</h5>
              :
              <h5 className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-nowrap scrollbar-hide">{item.course_name}</h5>
            }
            
          </div>
          <div>
            <a href={item.course_id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Learn more
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>
          </div>
          </motion.div>
        )
      :
      sortedCourses && sortedCourses.length>0 && sortedCourses.map((item)=>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full h-42 p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.course_id}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-nowrap overflow-x-auto scrollbar-hide">{item.course_name}</p>
          </div>
          <div>
              <a href={item.id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Learn more
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
          </div>
          </motion.div>
        )
      }
      </div>
    </div>
  )
}

export default SearchPage
