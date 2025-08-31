import { useEffect, useState } from "react";
import { backendApi } from "../../../../api";
import type { PaymentData } from "../../../../model/PaymentData.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../../store/store.ts";
import {getAllCourses} from "../../../../slices/courseSlice.ts";
import {getAllUsers} from "../../../../slices/usersSlice.ts";

export function AdminPayment() {
    const dispatch = useDispatch<AppDispatch>();
    const [payments, setPayments] = useState<PaymentData[]>([]);
    const {list: users} = useSelector((state: RootState) => state.users);
    const {list: courses} = useSelector((state: RootState) => state.course);
    const [loading, setLoading] = useState(true);
    const [editingPayment, setEditingPayment] = useState<PaymentData | null>(null);

    useEffect(() => {
        fetchPayments();
        dispatch(getAllCourses());
        dispatch(getAllUsers());
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await backendApi.get("/api/payment/all");
            setPayments(response.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch payments");
        } finally {
            setLoading(false);
        }
    };

    // const handleDelete = async (paymentId: number) => {
    //     if (confirm("Are you sure?")) {
    //         try {
    //             await backendApi.delete(`/api/payments/delete/${paymentId}`);
    //             fetchPayments();
    //         } catch (err) {
    //             console.error(err);
    //             alert("Delete failed");
    //         }
    //     }
    // };

    // Helpers
    const getUserName = (id: number): string => {
        const user = users.find((u) => u.id === id);
        console.log(user);
        return user ? user.username : "Unknown User";
    };

    const getCourseName = (courseId: number): string => {
        console.log(courseId);
        const course = courses.find((c) => c.id === courseId);
        console.log(course);
        return course ? course.name : "Unknown Courses";
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 px-4">
            <h1 className="text-3xl absolute top-45 left-1/2 transform -translate-x-1/2 font-bold text-blue-900 text-center mb-6">
                Admin Payment Management
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading payments...</p>
            ) : payments.length === 0 ? (
                <p className="text-center text-gray-500">No payments found.</p>
            ) : (
                <div className="w-[90%] max-w-6xl overflow-x-auto rounded-lg absolute top-80 left-1/2 transform -translate-x-1/2 shadow-md border border-gray-200">
                    <table className="min-w-full table-auto bg-white">
                        <thead className="bg-blue-100">
                        <tr>
                            <th className="w-1/12 py-3 px-4 text-left text-blue-900 font-semibold">ID</th>
                            <th className="w-2/12 py-3 px-4 text-left text-blue-900 font-semibold">User</th>
                            <th className="w-2/12 py-3 px-4 text-left text-blue-900 font-semibold">Course</th>
                            <th className="w-2/12 py-3 px-4 text-left text-blue-900 font-semibold">Amount</th>
                            <th className="w-2/12 py-3 px-4 text-left text-blue-900 font-semibold">Date</th>
                            {/*<th className="w-2/12 py-3 px-4 text-center text-blue-900 font-semibold">Actions</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map((p) => (
                            <tr key={p.paymentId} className="border-t hover:bg-blue-50">
                                <td className="py-3 px-4">{p.paymentId}</td>
                                <td className="py-3 px-4">{getUserName(p.userId)}</td>
                                <td className="py-3 px-4">{getCourseName(p.courseId)}</td>
                                <td className="py-3 px-4">
                                    {p.paymentAmount !== undefined && p.paymentAmount !== null
                                        ? `$${Number(p.paymentAmount).toFixed(2)}`
                                        : "N/A"}
                                </td>
                                <td className="py-3 px-4">{new Date(p.paymentDate).toLocaleDateString()}</td>
                                {/*<td className="py-3 px-4 text-center space-x-2">*/}
                                {/*    /!*<button*!/*/}
                                {/*    /!*    onClick={() => handleDelete(p.paymentId)}*!/*/}
                                {/*    /!*    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"*!/*/}
                                {/*    /!*>*!/*/}
                                {/*    /!*    Delete*!/*/}
                                {/*    /!*</button>*!/*/}
                                {/*</td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            {editingPayment && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Payment</h2>

                        <label className="block mb-2">Amount:</label>
                        <input
                            type="number"
                            value={editingPayment.paymentAmount}
                            onChange={(e) =>
                                setEditingPayment({
                                    ...editingPayment,
                                    paymentAmount: Number(e.target.value),
                                })
                            }
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingPayment(null)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert("Payment updated (replace with API call)");
                                    setEditingPayment(null);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
