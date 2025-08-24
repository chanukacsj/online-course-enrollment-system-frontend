import { useState } from "react";
import type { CourseData } from "../../../model/CourseData.ts";
import { backendApi } from "../../../api.ts";
import * as CryptoJS from "crypto-js";

type CourseProps = {
    data: CourseData;
};

export function Course({ data }: CourseProps) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const userId = localStorage.getItem("userId");

    const getMd5 = (input: string) => CryptoJS.MD5(input).toString().toUpperCase();
    const merchantID = "1230019";
    const merchantSecret = "MzY3MTUwNDg0MTIzMjQ5MDY3OTE1MTI1ODU3OTYxODc3MzY3Mjkx";
    const amount = data.price;
    const orderID = String(data.id);
    const amountFormatted = amount.toFixed(2);
    const currency = "LKR";
    const hash = getMd5(merchantID + orderID + amountFormatted + currency + getMd5(merchantSecret));

    const handleEnroll = async () => {
        if (!userId) {
            alert("User not logged in!");
            return;
        }

        if (isEnrolled) return;

        setLoading(true);
        try {
            const enrollmentData = {
                userId,
                courseId: courseId,
                enrollmentDate: new Date(),
                status: "PENDING",
            };

            console.log(enrollmentData,"enrollmentData");

            const response = await backendApi.post("api/enrollments/save", enrollmentData);
            if (response.status === 201) {
                setIsEnrolled(true);
                alert("Successfully enrolled!");
            }
        } catch (error) {
            console.error("Enrollment failed", error);
            alert("Failed to enroll. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentResponse = (status: string | null, orderId: string | null, courseId: string | null) => {

        console.log(courseId,"courseId");
        if (status === "SUCCESS" && orderId && !isEnrolled) {
            backendApi
                .post("api/payment/save", {
                    courseId,
                    userId,
                    paymentDate: new Date(),
                    paymentAmount: data.price,
                })
                .then(() => handleEnroll())
                .catch((err) => console.error("Error saving payment:", err));
        } else if (status === "CANCEL") {
            alert("Payment Canceled");
        }

        window.history.replaceState({}, document.title, "/userCourses");
    };

    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status");
    const orderId = queryParams.get("order_id");
    const courseId = queryParams.get("courseId");
    if ((status || orderId) && !isEnrolled) {
        handlePaymentResponse(status, orderId, courseId);
    }

    return (
        <div className="w-[16rem] m-3 flex-col justify-between shadow-lg rounded-lg border border-blue-300 hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out">
            {/* Image */}
            <div className="flex justify-center p-3">
                {data.image ? (
                    <img
                        src={`http://localhost:3000/uploads/course/${data.image}`}
                        alt={data.description}
                        className="h-[7rem] w-[12rem] object-cover rounded-md"
                    />
                ) : (
                    "No photo"
                )}
            </div>

            {/* Details */}
            <div className="flex flex-col items-center p-2 text-center">
                <h3 className="text-[#1f3c88] text-[1.2rem] font-semibold">{data.name}</h3>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">{data.description}</p>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-2 text-blue-700 text-sm hover:underline"
                >
                    {showDetails ? "Hide Details" : "View Details"}
                </button>

                {showDetails && (
                    <div className="text-xs text-gray-600 mt-2">
                        <p>
                            <span className="font-semibold">Start Date:</span> {data.course_start_date}
                        </p>
                        <p>
                            <span className="font-semibold">End Date:</span> {data.course_end_date}
                        </p>
                        <p className="mt-1 font-bold text-yellow-600">
                            Price:&nbsp;
                            <span className="ml-1">{data.currency}</span>
                            <span className="ml-1">{data.price}</span>
                        </p>
                    </div>
                )}

                <button
                    onClick={() => setShowPaymentModal(true)}
                    disabled={isEnrolled || loading}
                    className={`mt-3 px-5 py-2 rounded-lg text-white font-semibold text-sm ${
                          "bg-blue-600 hover:bg-blue-700"
                    } transition duration-200 w-[80%]`}
                >
                    {loading ? "Enrolling..." : isEnrolled ? "Enrolled" : "Enroll Now"}
                </button>

                {showPaymentModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                            <h2 className="text-lg font-bold mb-4">Payment Required</h2>
                            <p className="mb-4 text-gray-600">Please complete your payment to proceed with enrollment.</p>

                            <form
                                method="post"
                                action="https://sandbox.payhere.lk/pay/checkout"
                                className="space-y-3 bg-white p-4 rounded-xl shadow-md max-w-md mx-auto"
                            >
                                <input type="hidden" name="merchant_id" value={merchantID} />
                                <input type="hidden" name="return_url" value={`http://localhost:5173/userCourses?status=SUCCESS&courseId=${data.id}`} />
                                <input type="hidden" name="cancel_url" value="http://localhost:5173/userCourses?status=CANCEL" />
                                <input type="hidden" name="notify_url" value="http://localhost:5173" />
                                <input type="hidden" name="order_id" value={data.id} />
                                <input type="hidden" name="items" value={data.name} />
                                <input type="hidden" name="currency" value={currency} />
                                <input type="hidden" name="hash" value={hash} />

                                <div>
                                    <label htmlFor="amount" className="block text-xs font-medium text-gray-700">
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        defaultValue={data.price}
                                        readOnly
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-700 text-sm px-2 py-1 cursor-not-allowed"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" name="first_name" placeholder="First Name" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                    <input type="text" name="last_name" placeholder="Last Name" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="email" name="email" placeholder="Email" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                    <input type="text" name="phone" placeholder="Phone" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                </div>
                                <input type="text" name="address" placeholder="Address" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" name="city" placeholder="City" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                    <input type="text" name="country" placeholder="Country" className="mt-1 block w-full rounded-md border px-3 py-2 text-sm" />
                                </div>

                                <div className="flex justify-end gap-2 pt-3">
                                    <button type="button" onClick={() => setShowPaymentModal(false)} className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-xs">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700">
                                        Pay & Enroll
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
