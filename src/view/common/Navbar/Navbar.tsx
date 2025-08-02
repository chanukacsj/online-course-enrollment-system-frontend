// import './Navbar.css';
import {Link} from "react-router-dom";
import icon from '../../../assets/logo/logo.png';
import {useEffect, useState} from "react";
import { FaUserCircle } from "react-icons/fa";


export function Navbar() {

    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('username');
        setUsername(storedUserName)
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
    }, []);

    return (
        <div
            className="p-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 shadow-md flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src={icon}
                    alt="Logo"
                    className="w-40 h-auto"
                />
            </div>

            {/* Navigation Links */}
            <ul className="flex space-x-6">
                {role === 'customer' && (
                    <>
                        <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                            <Link to="/enrollmentCourse">Enrollment Courses</Link>
                        </li>
                        <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                            <Link to="/contact">Contact</Link>
                        </li>
                    </>
                )}

                {role === 'admin' && (
                    <>
                        <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                            <Link to="/users">Users</Link>
                        </li>
                        <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                            <Link to="/courses">Courses</Link>
                        </li>
                        <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                            <Link to="/enrollments">Enrollments</Link>
                        </li>
                    </>
                )}
            </ul>


            {/* Sign In Button and Log Out Button */}

            {
                username ? (
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-white text-3xl" />
                        <p className="text-xl text-blue-800 mr-5 mb-1 font-semibold">{username}</p>
                        <Link
                            to="/login"
                            className="text-lg font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg shadow-md transition duration-200"
                        >
                            Log Out
                        </Link>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md transition duration-200"
                    >
                        Sign In
                    </Link>
                )
            }
        </div>
    );
}
