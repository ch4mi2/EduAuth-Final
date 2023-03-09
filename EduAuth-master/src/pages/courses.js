import {useEffect , useState} from 'react'

//components
import CourseDetails from '../components/courseDetails'

import '../css/courses.css'
import Sidebar from '../pages/sideBar';
   
const Courses = () => {
   const [courses , setCourses] = useState(null)

   useEffect(() => {
        const fetchCourses = async() => {
            const response = await fetch('/api/courses')
            const json = await response.json()

            if(response.ok){
                setCourses(json)
            }
        } 

        fetchCourses()
    } , [])

    return (
        <>
        <div className="main">
             <Sidebar />
            <div classname = "contianer">
                {courses && courses.map((course) => (
                    <CourseDetails key = {course._id} course={course}/>
                ))}
            </div>
        </div>  
        </>  
    )
}

export default Courses;