import { useParams } from "react-router";
import data from '../data/courses.json'
import { motion } from "framer-motion";

function CoursePage() {
  let { id } = useParams();
    const course = data.filter(data =>
        data.id.toLowerCase().includes(id.toLowerCase())
      );
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
    {course && course.length>0 && course.map((item)=>
    <div className="space-y-3 mb-5">
        <div className="w-full flex h-32 p-6 bg-white border border-gray-200 rounded-lg shadow-md justify-between">
          <div>
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{item.id}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.course_time}</p>
          </div>
        </div>
        <div className="flex w-full h-16 p-6 bg-white border border-gray-200 rounded-lg">
          <p className="font-normal text-gray-600">Professor &nbsp;</p>
          <h5 className="font-bold text-gray-900">{item.professor}</h5>
        </div>
        <div className="flex w-full h-16 p-6 bg-white border border-gray-200 rounded-lg">
          <p className="font-normal text-gray-600">Discord Links &nbsp;</p>
          <h5 className="font-bold text-gray-900 underline">{item.discord_link}</h5>
        </div>
    </div>
    )}
    </div>
  )
}

export default CoursePage
