import { useParams } from "react-router";
import { motion } from "framer-motion";
import { supabase } from '../db/supabase'
import { useState, useEffect, useCallback } from 'react'
import { AddSectionModal, Loader, DeleteCourse } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CoursePage() {
  const [supadata, setSupadata] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const fetchCourses = useCallback(async () => {
    const { data: supadata } = await supabase
      .from('Courses')
      .select('*')
      .eq('course_id', id)
      setSupadata(supadata);
      setTimeout(() => {
        setLoading(false)
      }, 250);
  });
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
            <div className='pointer-events-auto'>
              <AddSectionModal close={setModal} name={supadata.at(0).course_name} id={id}/>
            </div>
            :
            <div className=''></div>
          }
          </div>
          <div className="p-5">
            <div className="flex mb-3 justify-between">
                <div>
                  <a href="/">
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      Home
                    </motion.button>
                  </a>
                </div>
                <div>
                    <motion.button className='font-bold bg-blue-600 p-3 rounded-md' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setModal(true)}> 
                      Add Section
                    </motion.button>
                </div>
          </div>
          <div className="grid grid-cols-1 gap-1 md:gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {supadata && supadata.length>0 && supadata.map((item)=>
            <motion.div key={item.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} className="space-y-3 mb-5 align-middle ">
                <div className="grid w-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md justify-between">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.course_name}</h5>
                    <p className="font-semibold text-gray-700 dark:text-gray-400">{item.course_id}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.course_time}</p>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Professor &nbsp;</p>
                    <h5 className="font-bold text-gray-900">{item.course_professor}</h5>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Discord Links &nbsp;</p>
                    <h5 className="font-bold text-gray-900 underline">{item.discord_link}</h5>
                  </div>
                  <div className="flex mt-3">
                    <DeleteCourse id={item.id} />
                  </div>
                </div>
            </motion.div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    }
    </>
    
  )
}

export default CoursePage
