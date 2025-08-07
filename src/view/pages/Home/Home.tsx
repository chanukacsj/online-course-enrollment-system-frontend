import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllCourses} from "../../../slices/courseSlice.ts";
import {getAllUsers} from "../../../slices/usersSlice.ts";
import {Course} from "../Course/Course.tsx";
import type {UserData} from "../../../model/UserData.ts";
import {backendApi} from "../../../api.ts";

export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const {list} = useSelector((state: RootState) => state.course);
    const {list: allUsers} = useSelector((state: RootState) => state.users);

    const [role, setRole] = useState<string | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchUser, setSearchUser] = useState("");

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase())
    );

    const filteredCourses = list.filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
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

    return (
        <>
            {role === "customer" && (
                <section className="py-12 px-6  min-h-screen">
                    <div className="relative text-center mb-10">
                        <h2 className="text-4xl font-extrabold text-blue-900 drop-shadow-md inline-block relative">
                            Explore Our Courses
                        </h2>
                        <div
                            className="absolute left-0 right-0 h-0.25 opacity-40 bg-black mt-4 mb-6 top-full mx-auto w-full rounded-full"></div>
                    </div>
                    <div className="flex justify-center mb-8">
                        <input
                            type="text"
                            placeholder="Search courses by name or description"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/*{list.length > 0 ? (*/}
                    {/*    <div*/}
                    {/*        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">*/}
                    {/*        {list.map((course) => (*/}
                    {/*            <Course key={course.id} data={course}/>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {filteredCourses.length > 0 ? (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            {filteredCourses.map((course) => (
                                <Course key={course.id} data={course}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-lg mt-10">
                            No courses available at the moment.
                        </p>
                    )}
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
