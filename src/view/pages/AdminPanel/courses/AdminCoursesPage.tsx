import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../../store/store.ts";
import type {CourseData} from "../../../../model/CourseData.ts";
import {getAllCourses} from "../../../../slices/courseSlice.ts";
import {backendApi} from "../../../../api.ts";

export function AdminCoursesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {list: courses} = useSelector((state: RootState) => state.course);

    const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const handleEditClick = (course: CourseData) => {
        setEditingCourse(course);
        setIsCreating(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await backendApi.delete(`/api/courses/delete/${id}`);
                alert(response.data.message || "Course deleted successfully");
                dispatch(getAllCourses());
            } catch (error) {
                console.error("Failed to delete course", error);
                alert("Failed to delete course");
            }
        }
    };

    const handleUpdate = async (updatedCourse: CourseData) => {
        try {
            const response = await backendApi.put(`/api/courses/update/${updatedCourse.id}`, updatedCourse);
            alert(response.data.message || "Course updated successfully");
            dispatch(getAllCourses());
            setEditingCourse(null);
        } catch (error) {
            console.error("Failed to update course", error);
            alert("Failed to update course");
        }
    };

    const handleCreate = async (newCourse: CourseData) => {
        try {
            const response = await backendApi.post(`/api/courses/save`, newCourse);
            alert(response.data.message || "Course created successfully");
            dispatch(getAllCourses());
            setIsCreating(false);
        } catch (error) {
            console.error("Failed to create course", error);
            alert("Failed to create course");
        }
    };
    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("photo", file);
        console.log(formData);
        try {
            console.log("Uploading image...");
            const res = await backendApi.post("/api/upload/course", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const uploadedFileName = res.data.filename;
            setEditingCourse((prev) =>
                prev ? { ...prev, image: `${uploadedFileName}` } : null
            );
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Image upload failed");
        }
    };


    return (
        <>
            <div className="max-w-6xl mx-auto mt-10 px-4">
                <h1 className="text-3xl absolute top-45 left-1/2 transform -translate-x-1/2 font-bold text-blue-900 text-center mb-6">
                    Admin Course Management
                </h1>
                <div className="flex absolute top-65 justify-center left-1/2 transform -translate-x-1/2 mb-8">
                    <input
                        type="text"
                        placeholder="Search courses by name or description"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-[600px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="text-right absolute top-65 left-3/16 transform -translate-x-1/2 mb-4">
                <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                            setEditingCourse({
                                id: 0,
                                name: "",
                                description: "",
                                price: 0,
                                currency: "LKR",
                                image: "",
                                course_start_date: "",
                                course_end_date: ""
                            });
                            setIsCreating(true);
                        }}
                    >
                        + Add New Course
                    </button>
                </div>

                {filteredCourses.length > 0 ? (
                    <div
                        className="w-[90%] max-w-6xl overflow-x-auto rounded-lg absolute top-80 left-1/2 transform -translate-x-1/2 shadow-md border border-gray-200">
                        <table className="min-w-full bg-white">
                            <thead className="bg-blue-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">ID</th>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">Name</th>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">Description</th>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">Start Date</th>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">End Date</th>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">Price</th>
                                <th className="py-3 px-4 text-left text-blue-900 font-semibold">Image</th>
                                <th className="py-3 px-4 text-center text-blue-900 font-semibold">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCourses.map((course) => (
                                <tr key={course.id} className="border-t hover:bg-blue-50">
                                    <td className="py-3 px-4">{course.id}</td>
                                    <td className="py-3 px-4">{course.name}</td>
                                    <td className="py-3 px-4">{course.description}</td>
                                    <td className="py-3 px-4">{course.course_start_date}</td>
                                    <td className="py-3 px-4">{course.course_end_date}</td>
                                    <td className="py-3 px-4">{course.price}</td>
                                    <td className="p-3">
                                        {course.image ? (
                                            <img
                                                src={`http://localhost:3000/uploads/course/${course.image}`}
                                                alt={course.description}
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        ) : (
                                            "No photo"
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center space-x-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                            onClick={() => handleEditClick(course)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            onClick={() => handleDelete(course.id)}
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
                    <p className="text-gray-500 text-center mt-6">No courses found.</p>
                )}

                {isCreating && editingCourse && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4 text-green-700">Add New Course</h2>

                            <label className="block mb-2">Course Name:</label>
                            <input
                                type="text"
                                value={editingCourse.name}
                                onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            <label className="block mb-2">Description:</label>
                            <input
                                type="text"
                                value={editingCourse.description}
                                onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            <label className="block mb-2">Price (LKR):</label>
                            <input
                                type="number"
                                value={editingCourse.price}
                                onChange={(e) => setEditingCourse({...editingCourse, price: Number(e.target.value)})}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                            <label className="block mb-2">Start Date:</label>
                            <input
                                type="date"
                                value={editingCourse.course_start_date || ""}
                                onChange={(e) =>
                                    setEditingCourse({
                                        ...editingCourse,
                                        course_start_date: e.target.value,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />
                            <label className="block mb-2">End Date:</label>
                            <input
                                type="date"
                                value={editingCourse.course_end_date || ""}
                                onChange={(e) =>
                                    setEditingCourse({
                                        ...editingCourse,
                                        course_end_date: e.target.value,
                                    })
                                }
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />


                            {/*<label className="block mb-2">Image URL:</label>*/}
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    value={editingCourse.image}*/}
                            {/*    onChange={(e) => setEditingCourse({...editingCourse, image: e.target.value})}*/}
                            {/*    className="w-full p-2 border border-gray-300 rounded mb-4"*/}
                            {/*/>*/}
                            <label className="block mb-2">Course Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        uploadImage(file);
                                        // setEditingCourse({...editingCourse, image: file.name});
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />


                            <div className="flex justify-end space-x-2">
                                <button
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => {
                                        setEditingCourse(null);
                                        setIsCreating(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                    onClick={() => handleCreate(editingCourse)}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {editingCourse && !isCreating && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Course</h2>

                            <label className="block mb-2">Course Name:</label>
                            <input
                                type="text"
                                value={editingCourse.name}
                                onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            <label className="block mb-2">Description:</label>
                            <input
                                type="text"
                                value={editingCourse.description}
                                onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            <label className="block mb-2">Price (LKR):</label>
                            <input
                                type="number"
                                value={editingCourse.price}
                                onChange={(e) => setEditingCourse({...editingCourse, price: Number(e.target.value)})}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            {/*<label className="block mb-2">Image URL:</label>*/}
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    value={editingCourse.image}*/}
                            {/*    onChange={(e) => setEditingCourse({...editingCourse, image: e.target.value})}*/}
                            {/*    className="w-full p-2 border border-gray-300 rounded mb-4"*/}
                            {/*/>*/}
                            <label className="block mb-2">Course Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        uploadImage(file);
                                        // setEditingCourse({...editingCourse, image: file.name});
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                            />

                            <div className="flex justify-end space-x-2">
                                <button
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setEditingCourse(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    onClick={() => handleUpdate(editingCourse)}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
