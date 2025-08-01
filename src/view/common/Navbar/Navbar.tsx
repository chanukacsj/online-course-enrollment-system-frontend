// import './Navbar.css';
import { Link } from "react-router-dom";
import icon from '../../../assets/logo/logo.png';

export function Navbar() {
    return (
        <div className="p-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 shadow-md flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src={icon}
                    alt="Logo"
                    className="w-40 h-auto"
                />
                {/*<h1 className="ml-3 text-2xl font-bold text-blue-700">Online Course</h1>*/}
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
                <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                    <Link to="/">Home</Link>
                </li>
                <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                    <Link to="/enrollmentCourse">Enrollment Courses</Link>
                </li>
                <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            {/* Sign In Button */}
            <Link
                to="/login"
                className="text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md transition duration-200"
            >
                Sign In
            </Link>
        </div>
    );
}
