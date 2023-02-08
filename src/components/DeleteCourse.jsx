
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
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
        } else {
            toast.success("Course Delete from the Database!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            if (length == 1){
                navigate("/");
            }
        }
    }
    
    return (
        <div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleDelete} className="font-normal bg-red-500 p-2 rounded-md">Delete Course</motion.button>
        </div>
    );
};