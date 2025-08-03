import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../../store/store";
import type {EnrollmentsCollectionData} from "../../../../model/EnrollmentCollectionData";
import {getAllEnrollments} from "../../../../slices/adminEnrollmentSlice";
import {backendApi} from "../../../../api";
import {getAllCourses} from "../../../../slices/courseSlice.ts";
import {getAllUsers} from "../../../../slices/usersSlice.ts";

export function AdminEnrollmentsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {list: enrollments} = useSelector((state: RootState) => state.adminEnrollment);
    const {list: users} = useSelector((state: RootState) => state.users);
    const {list: courses} = useSelector((state: RootState) => state.course);

    const [editingEnrollment, setEditingEnrollment] = useState<EnrollmentsCollectionData | null>(null);

    useEffect(() => {
        dispatch(getAllEnrollments());
        dispatch(getAllCourses());
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleUpdate = async (enrollment: EnrollmentsCollectionData) => {
        try {
            const response = await backendApi.put(`/api/enrollments/update/${enrollment.id}`, enrollment);
            alert(response.data.message || "Updated successfully");
            dispatch(getAllEnrollments());
            setEditingEnrollment(null);
        } catch (err) {
            console.error(err);
            alert("Failed to update");
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure?")) {
            try {
                await backendApi.delete(`/api/enrollments/delete/${id}`);
                dispatch(getAllEnrollments());
            } catch (err) {
                alert("Delete failed");
                console.error(err);
            }
        }
    };

    const getUserNameById = (id: number) => {
        const user = users.find((u) => u.id === id);
        return user ? user.username : "Unknown User";
    };

    const getCourseNameById = (id: number) => {
        const course = courses.find((c) => c.id === id);
        return course ? course.name : "Unknown Course";
    };


    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold absolute top-45 left-1/2 transform -translate-x-1/2 text-blue-900 text-center mb-6">Admin
                Enrollment Management</h1>
            <div className="w-[90%] max-w-6xl overflow-x-auto rounded-lg absolute top-80 left-1/2 transform -translate-x-1/2 shadow-md border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-100">
                    <tr>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">ID</th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">User Name</th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">Course Name</th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">Date</th>
                        <th className="py-3 px-4 text-left text-blue-900 font-semibold">Status</th>
                        <th className="py-3 px-4 text-center text-blue-900 font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {enrollments.map((enroll) => (
                        <tr key={enroll.id} className="border-t hover:bg-blue-50">
                            <td className="py-3 px-4">{enroll.id}</td>
                            <td className="py-3 px-4">{getUserNameById(enroll.userId)}</td>
                            <td className="py-3 px-4">{getCourseNameById(enroll.courseId)}</td>
                            <td className="py-3 px-4">{new Date(enroll.enrollmentDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">{enroll.status}</td>
                            <td className="py-3 px-4 text-center space-x-2">
                                <button
                                    onClick={() => setEditingEnrollment(enroll)}
                                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(enroll.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {editingEnrollment && (
                <Modal title="Edit Enrollment" onClose={() => setEditingEnrollment(null)}>
                    <EnrollmentForm
                        enrollment={editingEnrollment}
                        onSave={handleUpdate}
                        onCancel={() => setEditingEnrollment(null)}
                    />
                </Modal>
            )}
        </div>
    );
}

function Modal({title, children, onClose}: { title: string, children: React.ReactNode, onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-blue-700">{title}</h2>
                {children}
                <div className="mt-4 text-right">
                    <button onClick={onClose} className="text-sm text-gray-600 hover:underline">Close</button>
                </div>
            </div>
        </div>
    );
}

function EnrollmentForm({
                            enrollment,
                            onSave,
                            onCancel
                        }: {
    enrollment: EnrollmentsCollectionData,
    onSave: (data: EnrollmentsCollectionData) => void,
    onCancel: () => void
}) {
    const [form, setForm] = useState(enrollment);

    return (
        <div>
            <label className="block mb-2">Status:</label>
            <select
                value={form.status}
                onChange={(e) => setForm({...form, status: e.target.value})}
                className="w-full mb-3 border p-2 rounded"
            >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
            </select>

            <div className="flex justify-end space-x-2">
                <button onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button onClick={() => onSave(form)} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
        </div>
    );
}
