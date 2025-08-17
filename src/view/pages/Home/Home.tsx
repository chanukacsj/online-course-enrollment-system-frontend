import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllCourses} from "../../../slices/courseSlice.ts";
import {getAllUsers} from "../../../slices/usersSlice.ts";
import type {UserData} from "../../../model/UserData.ts";
import {backendApi} from "../../../api.ts";
import {useNavigate} from "react-router-dom";


export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const {list: allUsers} = useSelector((state: RootState) => state.users);

    const [role, setRole] = useState<string | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [searchUser, setSearchUser] = useState("");

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase())
    );


    useEffect(() => {
        dispatch(getAllCourses());
        dispatch(getAllUsers());
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, [dispatch]);

    useEffect(() => {
        setUsers(allUsers);
    }, [allUsers]);

    const handleEditClick = (user: UserData) => {
        setEditingUser(user);
    };

    const handleFormSubmit = async () => {
        if (!editingUser) return;

        try {
            const response = await backendApi.put(`/api/users/update/${editingUser.email}`, editingUser);
            console.log(response.data.message);
            alert(response.data.message);
            dispatch(getAllUsers());
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingUser) {
            setEditingUser({...editingUser, [e.target.name]: e.target.value});
        }
    };

    const handleDelete = async (email: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await backendApi.delete(`/api/users/delete/${email}`);
            alert(response.data.message);
            dispatch(getAllUsers());
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };
    const navigate = useNavigate();


    return (
        <>
            {role === "customer" && (
                <section className="w-full">
                    {/* Hero Section with Full-Width Image */}
                    <div className="relative w-full h-[90vh] flex items-center justify-center">
                        <img
                            src="src/assets/course/dashboard.jpg"
                            alt="Learning background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Centered Text */}
                        <div className="relative z-10 text-center text-white px-4">
                            <h1 className="text-5xl font-extrabold drop-shadow-lg">
                                Welcome to Our Learning Platform
                            </h1>
                            <p className="mt-4 text-lg max-w-2xl mx-auto">
                                Discover a wide range of courses designed to help you achieve your goals.
                                Learn at your own pace with expert instructors and interactive content.
                            </p>

                            <button
                                onClick={() => navigate("/userCourses")}
                                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105 text-sm"
                            >
                                View Courses
                            </button>

                        </div>
                    </div>

                    <div className="mt-16 max-w-6xl mx-auto mb-10 px-6">
                        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Card 1 */}
                            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                <img
                                    src="src/assets/course/undraw_online-learning_tgmv.png"
                                    alt="Quality Courses"
                                    className="w-full h-48 object-cover rounded-xl mb-4"
                                />
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">High-Quality Courses</h3>
                                <p className="text-gray-600">
                                    Learn from the best instructors with practical, real-world lessons.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                <img
                                    src="src/assets/course/undraw_hello_ccwj.png"
                                    alt="Flexible Learning"
                                    className="w-full h-48 object-cover rounded-xl mb-4"
                                />
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">Learn Anytime</h3>
                                <p className="text-gray-600">
                                    Study at your own pace from anywhere with 24/7 access.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                                <img
                                    src="src/assets/course/undraw_certificate_cqps.png"
                                    alt="Career Growth"
                                    className="w-full h-48 object-cover rounded-xl mb-4"
                                />
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">Boost Your Career</h3>
                                <p className="text-gray-600">
                                    Gain skills that help you advance and stand out in your field.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


            )}


            {role === "admin" && (
                <div className="max-w-6xl  mx-auto mt-10 px-4">
                    <h1 className="text-3xl absolute top-45 left-1/2 transform -translate-x-1/2 font-bold text-blue-900 text-center mb-6">
                        Admin User Management
                    </h1>
                    <div className="flex absolute top-65 justify-center left-1/2 transform -translate-x-1/2 mb-8">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-[600px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    {filteredUsers.length > 0 ? (
                        <div
                            className="w-[90%] max-w-6xl overflow-x-auto rounded-lg absolute top-80 left-1/2 transform -translate-x-1/2 shadow-md border border-gray-200">
                            <table className="min-w-full bg-white">
                                <thead className="bg-blue-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-blue-900 font-semibold">ID</th>
                                    <th className="py-3 px-4 text-left text-blue-900 font-semibold">Name</th>
                                    <th className="py-3 px-4 text-left text-blue-900 font-semibold">Email</th>
                                    <th className="py-3 px-4 text-left text-blue-900 font-semibold">Role</th>
                                    <th className="py-3 px-4 text-center text-blue-900 font-semibold">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-t hover:bg-blue-50">
                                        <td className="py-3 px-4">{user.id}</td>
                                        <td className="py-3 px-4">{user.username}</td>
                                        <td className="py-3 px-4">{user.email}</td>
                                        <td className="py-3 px-4 capitalize">{user.role}</td>
                                        <td className="py-3 px-4 text-center space-x-2">
                                            <button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleEditClick(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                onClick={() => handleDelete(user.email)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-6">No users found.</p>
                    )}

                    {editingUser && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-bold mb-4 text-blue-700">Edit User</h2>
                                <label className="block mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editingUser.username}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                />
                                <label className="block mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editingUser.email}
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-100"
                                />
                                <label className="block mb-2">Role:</label>
                                <select
                                    name="role"
                                    value={editingUser.role}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mb-4">
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => setEditingUser(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        onClick={handleFormSubmit}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
