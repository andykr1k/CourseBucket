import { useState, useEffect } from 'react'
import { Routes, Route  } from "react-router-dom"
import { SearchPage, CoursePage } from './pages'
function App() {

  return (
    <Routes>
        <Route path="/" element={ <SearchPage/>} />
        <Route path="/:id"  element={ <CoursePage/>} />
      </Routes>
  )
}

export default App
