
import { supabase } from '../db/supabase'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function DeleteCourse({id}){
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
            navigate("/");
        }
    }
    
    return (
        <div>
            <button onClick={handleDelete} className="font-normal bg-red-500 p-2 rounded-md">Delete Course</button>
        </div>
    );
};