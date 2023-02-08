import { Routes, Route  } from "react-router-dom"
import { SearchPage, CoursePage, ErrorPage, AuthPage } from './pages'
import {AddCourseModal} from './components'
function App() {

  return (
    <Routes>
        <Route path="/" element={ <SearchPage/>} />
        {/*<Route path="/auth" element={<AuthPage />} />*/}
        <Route path="/:id"  element={ <CoursePage/>} />
        <Route path="/add" element= { <AddCourseModal/>} />
        <Route path="/*" element={ <ErrorPage />} />
    </Routes>
  )
}

export default App
