import { useParams } from "react-router";
import { motion } from "framer-motion";
import { supabase } from '../db/supabase'
import { useState, useEffect, useCallback } from 'react'
import { AddSectionModal, Loader, DeleteCourse } from '../components';
import { ErrorPage } from '../pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfessorPage() {
  const [supadata, setSupadata] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const fetchCourses = useCallback(async () => {
    const { data: supadata } = await supabase
      .from('Courses')
      .select('*')
      .eq('course_professor', id.replace(/%20/g, ' '))

      setSupadata(supadata);
      console.log(supadata);
      setTimeout(() => {
        setLoading(false)
      }, 250);
  });


  const handleFilter = (e) => {
    e.preventDefault();
    supadata.sort((a, b) => a.course_id > b.course_id ? 1 : -1)
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
    {
      loading == true
      ?
      <Loader />
      :
      <div className='h-100vh w-100vw'>
        <div className='fixed z-10 pointer-events-none w-full'>
          { modal == true ?
            <div className='pointer-events-auto backdrop-blur-sm h-screen p-5 sm:p-20 xl:p-44'>
              <AddSectionModal close={setModal} name={supadata.at(0).course_name} id={id}/>
            </div>
            :
            <div className=''></div>
          }
        </div>
          <div className="p-5">
            <div className="flex mb-3 justify-between">
                <div className="flex align-middle items-center space-x-3">
                  <a href="/">
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      Home
                    </motion.button>
                  </a>
                  <h1 className='font-bold bg-blue-600 p-3 rounded-md'>
                    {id}
                  </h1>
                </div>
                <div className="space-x-3">
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleFilter}> 
                      Sort
                    </motion.button>
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setModal(true)}> 
                      Add Section
                    </motion.button>
                </div>
          </div>
          { supadata.length>0 ? 
            <div className="grid grid-cols-1 gap-1 md:gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {supadata && supadata.length>0 && supadata.map((item)=>
            <motion.div key={item.course_id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-3 mb-5 align-middle ">
            <div className="grid w-full h-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md justify-between">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.course_name}</h5>
                    <a href={"/"+item.course_id}>
                      <p className="font-semibold text-blue-600 dark:text-gray-400">{item.course_id}</p>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.course_time}</p>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Professor &nbsp;</p>
                    <a href={"/professor/"+item.course_professor}>
                      <h5 className="font-bold text-blue-600">{item.course_professor}</h5>
                    </a>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Social Link &nbsp;</p>
                    <a href={"https:/"+item.discord_link} target="_blank">
                      <h5 className="font-bold text-blue-600">{item.discord_link}</h5>
                    </a>
                  </div>
                  <div className="flex mt-3">
                    <DeleteCourse id={item.course_crn} length={supadata.length} />
                  </div>
                </div>
            </motion.div>
            )}
          </div>
          :
          <ErrorPage />
          }
        </div>
        <ToastContainer />
      </div>
    }
    </>
    
  )
}

export default ProfessorPage