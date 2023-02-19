import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import { Loader } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CoursePage() {
  const [data,setData] = useState();
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const getData=()=>{
    fetch('/data/ANTH.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson.filter( item => item.course_crn == id))
      });

      setTimeout(() => {
        setLoading(false)
      }, 500);
  }

  useEffect(() => {
    console.log(id);
    getData();
  }, []);
  return (
    <>
    {
      loading == true
      ?
      <Loader />
      :
      <div className='h-100vh w-100vw'>
          <div className="p-5 space-y-3">
          
            <div className="flex mb-3 justify-between">
                <div className="flex align-middle items-center space-x-3">
                  <a href="/">
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      Home
                    </motion.button>
                  </a>
                  <a href={"/"+data.at(0).course_id}>
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {data.at(0).course_id}
                    </motion.button>
                  </a>
                  <h1 className='font-bold bg-blue-600 p-3 rounded-md'>
                    Section:&nbsp;{data.at(0).course_section}
                  </h1>
                  <h1 className='font-bold bg-blue-600 p-3 rounded-md'>
                    CRN:&nbsp;{data.at(0).course_crn}
                  </h1>
                </div>
          </div>
            <motion.div key={data.at(0).course_crn} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="align-middle">
                <div className="grid w-full h-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{data.at(0).course_name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.at(0).course_days + " " + data.at(0).course_time}</p>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Professor &nbsp;</p>
                    <a href={"/professor/"+data.at(0).course_professor}>
                      <h5 className="font-bold text-blue-600">{data.at(0).course_professor}</h5>
                    </a>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Location &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{data.at(0).course_location}</h5>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Type &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{data.at(0).course_type}</h5>
                  </div>
                </div>
            </motion.div>
            <motion.div key={data.at(0).course_crn} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="align-middle">
                <div className="grid w-full h-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Course Reviews</h5>
                  </div>
                </div>
            </motion.div>
        </div>
        <ToastContainer />
      </div>
    }
    </>
    
  )
}

export default CoursePage
