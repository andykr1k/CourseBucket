import { useParams } from "react-router";
import data from '../data/courses.json'
import { motion } from "framer-motion";
import { supabase } from '../db/supabase'
import { useState, useEffect, useCallback } from 'react'

function CoursePage() {
  const [supadata, setSupadata] = useState([]);
  const [modal, setModal] = useState(false);
  let { id } = useParams();

  const fetchCourses = useCallback(async () => {
    const { data: supadata } = await supabase
      .from('Courses')
      .select('*')
      .eq('course_id', id)
      setSupadata(supadata);
  });

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className='h-100vh w-100vw p-5'>
      <div className="flex mb-3">
            <div>
              <a href="/">
                <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  Home
                </motion.button>
              </a>
            </div>
        </div>
    {supadata && supadata.length>0 && supadata.map((item)=>
    <div className="space-y-3 mb-5 align-middle ">
        <div className="w-full flex h-32 p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md justify-between">
          <div>
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{item.course_name}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{item.course_id}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.course_time}</p>
          </div>
        </div>
        <div className="flex w-full h-16 p-6 bg-white/90 border border-gray-200 rounded-lg">
          <p className="font-normal text-gray-600">Professor &nbsp;</p>
          <h5 className="font-bold text-gray-900">{item.course_professor}</h5>
        </div>
        <div className="flex w-full h-16 p-6 bg-white/90 border border-gray-200 rounded-lg">
          <p className="font-normal text-gray-600">Discord Links &nbsp;</p>
          <h5 className="font-bold text-gray-900 underline">{item.discord_link}</h5>
        </div>
    </div>
    )}
    </div>
  )
}

export default CoursePage
