import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home/Home.tsx";
import {Contact} from "../../pages/Contact/Contact.tsx";
import {EnrollmentCoursePage} from "../../pages/CourseDetailsPage/EnrollmentCoursePage.tsx";

export function MainContent() {
    return (
        <div className="flex justify-center
                       items-center min-h-screen">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/enrollmentCourse" element={<EnrollmentCoursePage/>} />
            </Routes>
        </div>
    );
}