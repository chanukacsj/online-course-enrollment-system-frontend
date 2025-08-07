import { useState } from "react";
import type { CourseData } from "../../../model/CourseData.ts";
import {backendApi} from "../../../api.ts";

type CourseProps = {
    data: CourseData;
};

// const images: Record<string, string> = import.meta.glob(
//     '../../../assets/course/*',
//     { eager: true, import: 'default' }
// );

export function Course({ data }: CourseProps) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    //const image = images[`../../../assets/course/${data.image}`];

    const handleEnroll = async () => {
        setLoading(true);
        try {
            const enrollmentData = {
                userId: localStorage.getItem("userId"),
                courseId: data.id,
                enrollmentDate: new Date(),
                status: "PENDING"
            };
                console.log(enrollmentData);
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

    return (
        <div
            className="w-[16rem]  m-3 flex-col justify-between
               shadow-lg rounded-lg border border-blue-300
               hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out"
        >
            {/* Image */}
            <div className="flex justify-center p-3">
                {/*<img*/}
                {/*    className="h-[7rem] w-[12rem] object-cover rounded-md"*/}
                {/*    src={image}*/}
                {/*    alt={data.name}*/}
                {/*/>*/}
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
                <h3 className="text-[#1f3c88] text-[1.2rem] font-semibold">
                    {data.name}
                </h3>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                {data.description}
                </p>

                {/* Toggle Button */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-2 text-blue-700 text-sm hover:underline"
                >
                    {showDetails ? "Hide Details" : "View Details"}
                </button>

                {/* Collapsible Details */}
                {showDetails && (
                    <div className="text-xs text-gray-600 mt-2">
                        <p><span className="font-semibold">Start Date:</span> {data.course_start_date}</p>
                        <p><span className="font-semibold">End Date:</span> {data.course_end_date}</p>
                        <p className="mt-1 font-bold text-yellow-600">
                            Price:&nbsp;
                            <span className="ml-1">{data.currency}</span>
                            <span className="ml-1">{data.price}</span>
                        </p>

                    </div>
                )}

                {/* Enroll Button */}
                <button
                    onClick={handleEnroll}
                    disabled={isEnrolled || loading}
                    className={`mt-3 px-5 py-2 rounded-lg text-white font-semibold text-sm
                        ${isEnrolled ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                        transition duration-200 w-[80%]`}
                >
                    {loading ? "Enrolling..." : isEnrolled ? "Enrolled" : "Enroll Now"}
                </button>
            </div>
        </div>

    );
}
