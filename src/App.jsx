import { useState, useEffect } from 'react'
import { Routes, Route  } from "react-router-dom"
import { SearchPage, CoursePage } from './pages'
import {AddCourseModal} from './components'
function App() {

  return (
    <Routes>
        <Route path="/" element={ <SearchPage/>} />
        <Route path="/:id"  element={ <CoursePage/>} />
        <Route path="/add" element= { <AddCourseModal/>} />
      </Routes>
  )
}

export default App
