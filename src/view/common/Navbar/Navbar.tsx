import { Link, useNavigate } from "react-router-dom";
import icon from "../../../assets/logo/logo.png";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

export function Navbar() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        setUsername(storedUserName);
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <nav className="p-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 shadow-md">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={icon} alt="Logo" className="w-32 sm:w-40 h-auto" />
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6">
                    {role === "customer" && (
                        <>
                            <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                                <Link to="/userCourses">Courses</Link>
                            </li>
                            <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                                <Link to="/enrollmentCourse">Enrollment Courses</Link>
                            </li>
                            <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                                <Link to="/contact">Contact</Link>
                            </li>
                        </>
                    )}

                    {role === "admin" && (
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
                            <li className="text-lg text-blue-800 font-semibold px-3 hover:text-blue-600 transition-colors duration-200">
                                <Link to="/payments">Payment</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Profile / Sign In */}
                <div className="hidden md:flex items-center space-x-4">
                    {username ? (
                        <>
                            <FaUserCircle
                                className="text-white text-3xl cursor-pointer"
                                onClick={() => setIsProfileOpen(true)}
                            />
                            <p className="text-xl text-black mr-5 mb-1 semi-bold">
                                {username}
                            </p>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md transition duration-200"
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <HiX className="text-3xl text-blue-800" />
                        ) : (
                            <HiMenu className="text-3xl text-blue-800" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 space-y-4 bg-white p-4 rounded-lg shadow-md">
                    <ul className="space-y-3">
                        {role === "customer" && (
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/userCourses"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/enrollmentCourse"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Enrollment Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <li>
                                    <Link
                                        to="/users"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Users
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/courses"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/enrollments"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-lg text-blue-800 font-semibold hover:text-blue-600"
                                    >
                                        Enrollments
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Profile / Sign In for mobile */}
                    <div className="mt-4">
                        {username ? (
                            <div className="flex items-center space-x-3">
                                <FaUserCircle
                                    className="text-blue-800 text-3xl cursor-pointer"
                                    onClick={() => setIsProfileOpen(true)}
                                />
                                <p className="text-lg text-black">{username}</p>
                                <button
                                    onClick={handleLogout}
                                    className="ml-auto text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition duration-200"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-center text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow-md transition duration-200"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Profile Modal */}
            {isProfileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setIsProfileOpen(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-lg p-6 w-80 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsProfileOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✖
                        </button>

                        <div className="flex flex-col items-center space-y-4">
                            <FaUserCircle className="text-blue-800 text-6xl" />
                            <p className="text-xl font-semibold text-blue-900">{username}</p>
                            <p className="text-gray-600">{email}</p>
                            <button
                                onClick={handleLogout}
                                className="mt-2 text-white bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg shadow-md transition duration-200"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
