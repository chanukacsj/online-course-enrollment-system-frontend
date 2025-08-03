import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home/Home.tsx";
import {Contact} from "../../pages/Contact/Contact.tsx";
import {EnrollmentCoursePage} from "../../pages/CourseDetailsPage/EnrollmentCoursePage.tsx";
import {AdminCoursesPage} from "../../pages/AdminPanel/courses/AdminCoursesPage.tsx";
import {AdminEnrollmentsPage} from "../../pages/AdminPanel/enrollmentCourses/AdminEnrollmentsPage.tsx";

export function MainContent() {
    return (
        <div className="flex justify-center
                       items-center min-h-screen">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/enrollmentCourse" element={<EnrollmentCoursePage/>}/>
                <Route path="/courses" element={<AdminCoursesPage/>}/>
                <Route path="/users" element={<Home/>}/>
                <Route path="/enrollments" element={<AdminEnrollmentsPage/>}/>
            </Routes>
        </div>
    );
}