import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import { AddSectionModal, Loader } from '../components';
import { ErrorPage } from '../pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfessorPage() {
  const [data,setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [drop, setDrop] = useState(false);
  const [sortedName, setSortedName] = useState(false);
  const [sortedID, setSortedID] = useState(false);
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
        setData(myJson.filter( item => item.course_professor == id.replace(/%20/g, ' ')))
      });

      setTimeout(() => {
        setLoading(false)
      }, 500);
  }

  function handleFilter(){
    if (drop == false) {
      setDrop(true)
    } else {
      setDrop(false);
    }
  }

  function handleNameSort(){
    setSortedName(!sortedName)
    if (sortedName == false){
      setSortedID(false)
      data.sort((a, b) => a.course_name > b.course_name  ? 1 : -1)
    } else {
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
          setData(myJson.filter( item => item.course_professor == id.replace(/%20/g, ' ')))
        });
    }
  }

  function handleIDSort(){
    setSortedID(!sortedID)
    if (sortedID == false){
      setSortedName(false)
      data.sort((a, b) => a.course_id > b.course_id  ? 1 : -1)
    } else {
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
          setData(myJson.filter( item => item.course_professor == id.replace(/%20/g, ' ')))
        });
    }
  }

  useEffect(() => {
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
                <div>
                  <motion.button className="flex align-middle justify-center items-center font-bold bg-blue-600 p-3 rounded-md" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleFilter}>
                      <h2> 
                        Sort
                      </h2>
                      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                  </motion.button>
                  {
                  drop == true ?
                  <div className="fixed grid right-0 w-36 bg-blue-600 rounded-md z-10 mt-2 mr-5 p-3 space-y-3">
                    <div className="flex justify-between">
                      <h3>Name</h3>
                      { sortedName == true ? 
                        <button className="w-5 h-5 bg-white rounded-md" onClick={handleNameSort}></button>
                      :
                      <button className="w-5 h-5 outline rounded-md" onClick={handleNameSort}></button>
                      }
                    </div>
                    <div className="flex justify-between">
                      <h3>ID</h3>
                      { sortedID == true ? 
                        <button className="w-5 h-5 bg-white rounded-md" onClick={handleIDSort}></button>
                      :
                      <button className="w-5 h-5 outline rounded-md" onClick={handleIDSort}></button>
                      }
                    </div>       
                  </div>
                  :
                  <div></div>
                }
                </div>
          </div>
          { data.length>0 ? 
            <div className="grid grid-cols-1 gap-1 md:gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data && data.length>0 && data.map((item)=>
            <motion.div key={item.course_crn} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="align-middle ">
            <div className="grid w-full h-full p-6 bg-white/90 border border-gray-200 rounded-lg shadow-md">
                  <div>
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white">{item.course_name}</h5>
                    <a href={"/"+item.course_id}>
                      <p className="font-semibold text-blue-600 dark:text-gray-400">{item.course_id}</p>
                    </a>
                    <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">{item.course_days + " " + item.course_time}</p>
                  </div>
                  <div className="flex">
                    <p className="font-normal text-gray-600">Professor &nbsp;</p>
                    <motion.a href={"/professor/"+item.course_professor} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <h5 className="font-bold text-blue-600">{item.course_professor}</h5>
                    </motion.a>
                  </div>
                  <div className="flex text-xs">
                    <p className="font-normal text-gray-600">Location &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{item.course_location}</h5>
                  </div>
                  <div className="flex text-xs mb-2">
                    <p className="font-normal text-gray-600">Type &nbsp;</p>
                    <h5 className="font-bold text-blue-600">{item.course_type}</h5>
                  </div>
                  <div>
                    <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={"/course/"+item.course_crn} className="inline-flex items-center px-3 py-2 text-xs md:text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Details
                      <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </motion.a>
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