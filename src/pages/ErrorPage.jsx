import { motion } from "framer-motion"

function ErrorPage() {
  return (
    
    <div class="grid h-screen px-4 place-items-center">
        <div class="text-center">
            <h1 class="font-black text-gray-200 text-9xl">404</h1>

            <p class="text-2xl font-bold tracking-tight text-gray-400 sm:text-4xl">
            Uh-oh!
            </p>

            <p class="mb-8 text-gray-500">We can't find that course id.</p>

            <a
            href="/"
            >
            <motion.button 
            className="font-bold bg-blue-600 p-3 rounded-md"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Go Back Home
            </motion.button>
            </a>
        </div>
    </div>
  )
}

export default ErrorPage


