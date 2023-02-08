
import { supabase } from '../db/supabase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

export default function DeleteCourse({id, length}){
    const navigate = useNavigate();

    async function handleDelete() {
        const { error } = await supabase
            .from('Courses')
            .delete()
            .eq('id', id)

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
            if (length == 1){
                toast.success("Course Deleted!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.success("Course Deleted!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setTimeout(() => {
                    window.location.reload(false);
                  }, 2000);
            }
        }
    }
    
    return (
        <div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleDelete} className="font-normal bg-red-500 p-2 rounded-md">Delete Course</motion.button>
        </div>
    );
};