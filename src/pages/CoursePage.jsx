import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import { Loader, SmallLoader } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CoursePage() {
  const [data,setData] = useState();
  const [prereq,setPrereq] = useState();
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reqloading, setReqloading] = useState(true);

  let { id } = useParams();

  const getData=()=>{
    fetch('/data/data.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(function(response){
      return response.json();
    })
    .then(function(myJson) {
      setData(myJson.find( item => item.course_crn == id))
      setPrereq(myJson.find( item => item.course_crn == id).course_prereq)
    })
    .then(() =>{
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })
    .then(() =>{
      fixReqs();
    });
  }

  const fixReqs=()=>{
    const arr = prereq?.split("/");
    setReqs(arr?.slice(0,-1));
    setTimeout(() => {
      setReqloading(false)
    }, 1000);
  }

  getData();
  
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
                  <a href={"/"+data.course_id}>
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {data.course_id+"-"+data.course_section}
                    </motion.button>
                  </a>
                  <h1 className='font-bold bg-blue-600 p-3 rounded-md'>
                    CRN:&nbsp;{data.course_crn}
                  </h1>
                </div>
          </div>
            <motion.div key={data.course_crn} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="align-middle">
                <div className="grid w-full h-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{data.course_name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.course_days + " " + data.course_time}</p>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Section &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{data.course_section}</h5>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Professor &nbsp;</p>
                    <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={"/professor/"+data.course_professor}>
                      <h5 className="font-bold text-blue-600">{data.course_professor}</h5>
                    </motion.a>
                  </div>
                
                  <div className="flex">
                    <p className="font-normal text-gray-600">Location &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{data.course_location}</h5>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Type &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{data.course_type}</h5>
                  </div>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="align-middle">
                <div className="grid w-full h-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Prerequisites</h5>
                  </div>
                  {
                    reqloading == true ? 
                      <SmallLoader />
                    :
                    <>
                    {
                      reqs?.length > 0 ?
                      <div>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {reqs && reqs.map((item) =>
                          <motion.a key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} href={"/"+item}  className="bg-blue-600 grid w-full h-full p-6 rounded-lg shadow-md text-white items-center justify-center text-xl">
                            {item}
                          </motion.a>
                          )
                          }
                        </div>
                      </div>
                      :
                      <motion.div className="bg-blue-600 grid w-full h-full p-6 rounded-lg shadow-md text-white items-center justify-center text-xl">
                          No Prerequisites
                      </motion.div>
                    }
                    </>
                  }
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="align-middle">
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
