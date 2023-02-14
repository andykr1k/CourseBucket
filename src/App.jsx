import { Routes, Route  } from "react-router-dom"
import { SearchPage, CoursesPage, ErrorPage, AuthPage, ProfessorPage } from './pages'
import {AddCourseModal} from './components'
function App() {

  return (
    <Routes>
        <Route path="/" element={ <SearchPage/>} />
        {/*<Route path="/auth" element={<AuthPage />} />*/}
        <Route path="/:id"  element={ <CoursesPage/>} />
        <Route path="/add" element= { <AddCourseModal/>} />
        <Route path="/professor/:id" element={ <ProfessorPage/> } />
        <Route path="/*" element={ <ErrorPage />} />
    </Routes>
  )
}

export default App
