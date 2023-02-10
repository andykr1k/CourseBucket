import { useState, useCallback } from "react"
import { supabase } from '../db/supabase'
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion";

function AddSectionModal({close, name, id}) {
  const [courseProfessor, setCourseProfessor] = useState('')
  const [courseType, setCourseType] = useState('')
  const [courseLocation, setCourseLocation] = useState('')
  const [discordLink, setDiscordLink] = useState('')
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)

  const addCourse = useCallback(async (e) => {
    e.preventDefault();
    var start = document.getElementById('starthour').value + ":" + document.getElementById('startminute').value + document.getElementById('starttype').value
    var end = document.getElementById('endhour').value + ":" + document.getElementById('endminute').value + document.getElementById('endtype').value
    var week = "";
    var coursetime = "";
    if (monday){
      week = week + "M"
    }
    if (tuesday){
      week = week + "T"
    }
    if (wednesday){
      week = week + "W"
    }
    if (thursday){
      week = week + "Th"
    }
    if (friday){
      week = week + "F"
    }
    if (week != ''){
      coursetime = coursetime + week
    }
    if (start != ''){
      coursetime = coursetime + " " + start + " - "
    }
    if (end != ''){
      coursetime = coursetime + end
    }
    console.log(coursetime)
    if (courseProfessor != '' && courseType != '' ){
      const { data, error } = await supabase
        .from('Courses')
        .insert([{ course_id: id, course_professor: courseProfessor, course_name: name, course_type: courseType, course_time: coursetime, discord_link: discordLink, course_location: courseLocation }])
      
        if (error){
          toast.error(error, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
        } else {
          close(false)
          toast.success("Course Section Created!", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            setTimeout(() => {
              window.location.reload(false);
            }, 3000);
        }
    } else {
      toast.error("Please fill in professor and type", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    }
  });

    return (
      <div className="">
        <form className="bg-white p-8 rounded-md" onSubmit={addCourse}>
          <div className="relative z-0 w-full group">
            <h1 className="text-xl md:text-3xl font-bold pb-2 md:pb-3 text-center text-black">
              Add Course Section
            </h1>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setCourseProfessor(e.target.value)} />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Professor (Ex. John Smith)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setCourseType(e.target.value)} />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type (Ex. Discussion/Lecture/Lab)</label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setCourseLocation(e.target.value)} />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location (Ex. Olmstead 1401)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
            <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setDiscordLink(e.target.value)}  />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link (Ex. discord.com/aZ3as3A2s)</label>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group md:space-x-3 md:flex align-middle justify-center items-center">
              <div className="flex align-middle items-center justify-center text-blue-600">
                  <div className="inline-flex text-lg rounded-md shadow-lg p-2 items-center">
                    <select name="" id="starthour" className="px-1 outline-none appearance-none bg-transparent border-0">
                      <option value="01">1</option>
                      <option value="02">2</option>
                      <option value="03">3</option>
                      <option value="04">4</option>
                      <option value="05">5</option>
                      <option value="06">6</option>
                      <option value="07">7</option>
                      <option value="08">8</option>
                      <option value="09">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <select name="" id="startminute" className="px-1 outline-none appearance-none bg-transparent border-0">
                      <option value="00">00</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="50">50</option>
                    </select>
                    <select name="" id="starttype" className="px-1 outline-none appearance-none bg-transparent border-0">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
              </div>
              <h3 className="flex items-center align-middle justify-center text-sm text-gray-500 dark:text-gray-400"> to </h3>
              <div className="flex align-middle items-center justify-center text-blue-600">
                  <div className="inline-flex text-lg rounded-md shadow-lg p-2 items-center">
                    <select name="" id="endhour" className="px-1 outline-none appearance-none bg-transparent border-0">
                      <option value="01">1</option>
                      <option value="02">2</option>
                      <option value="03">3</option>
                      <option value="04">4</option>
                      <option value="05">5</option>
                      <option value="06">6</option>
                      <option value="07">7</option>
                      <option value="08">8</option>
                      <option value="09">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <select name="" id="endminute" className="px-1 outline-none appearance-none bg-transparent border-0">
                      <option value="00">00</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="50">50</option>
                    </select>
                    <select name="" id="endtype" className="px-1 outline-none appearance-none bg-transparent border-0">
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group space-x-3 flex align-middle justify-center items-center">
            <h3 className="text-sm text-gray-500 dark:text-gray-400"> Weekdays </h3>
                { monday == true ?
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-blue-600 p-2 font-bold rounded-md" onClick={() => setMonday(!monday)}>
                      M
                    </motion.button>
                :
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-slate-400 p-2 font-bold rounded-md" onClick={() => setMonday(!monday)}>
                      M
                    </motion.button>
                }
                { tuesday == true ?
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-blue-600 p-2 font-bold rounded-md" onClick={() => setTuesday(!tuesday)}>
                      T
                    </motion.button>
                :
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-slate-400 p-2 font-bold rounded-md" onClick={() => setTuesday(!tuesday)}>
                      T
                    </motion.button>
                }
                { wednesday == true ?
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-blue-600 p-2 font-bold rounded-md" onClick={() => setWednesday(!wednesday)}>
                      W
                    </motion.button>
                :
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-slate-400 p-2 font-bold rounded-md" onClick={() => setWednesday(!wednesday)}>
                      W
                    </motion.button>
                }
                { thursday == true ?
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-blue-600 p-2 font-bold rounded-md" onClick={() => setThursday(!thursday)}>
                      Th
                    </motion.button>
                :
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-slate-400 p-2 font-bold rounded-md" onClick={() => setThursday(!thursday)}>
                      Th
                    </motion.button>
                }
                { friday == true ?
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-blue-600 p-2 font-bold rounded-md" onClick={() => setFriday(!friday)}>
                      F
                    </motion.button>
                :
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} type="button" className="text-sm text-white bg-slate-400 p-2 font-bold rounded-md" onClick={() => setFriday(!friday)}>
                      F
                    </motion.button>
                }
            </div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Submit</button>
          <button type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-1" onClick={() => close(false)}>Cancel</button>
        </form>
      </div>
    )
}

export default AddSectionModal
