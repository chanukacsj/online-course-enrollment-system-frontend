import { useState } from "react";
import type { CourseData } from "../../../model/CourseData.ts";
import {backendApi} from "../../../api.ts";

type CourseProps = {
    data: CourseData;
};

const images: Record<string, string> = import.meta.glob(
    '../../../assets/course/*',
    { eager: true, import: 'default' }
);

export function Course({ data }: CourseProps) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);

    const image = images[`../../../assets/course/${data.image}`];

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
            className="w-[16rem] h-[22rem] m-3 flex flex-col justify-between
                       shadow-lg rounded-lg border border-blue-300
                       hover:shadow-xl hover:bg-blue-50 transition duration-300 ease-in-out"
        >
            {/* Image */}
            <div className="flex justify-center p-3">
                <img
                    className="h-[7rem] w-[12rem] object-cover rounded-md hover:scale-105 transition duration-300"
                    src={image}
                    alt={data.name}
                />
            </div>

            {/* Details */}
            <div className="flex flex-col items-center p-2 text-center">
                <h3 className="text-[#1f3c88] text-[1.2rem] font-semibold">
                    {data.name}
                </h3>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                    {data.description}
                </p>

                {/* Price */}
                <div className="bg-yellow-300 mt-3 px-3 py-1 rounded-lg">
                    <h3 className="text-[1.2rem] font-bold">
                        {data.price} <small>{data.currency}</small>
                    </h3>
                </div>

                {/* Enroll Button */}
                <button
                    onClick={handleEnroll}
                    disabled={isEnrolled || loading}
                    className={`mt-4 px-5 py-2 rounded-lg text-white font-semibold text-sm
                        ${isEnrolled ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                        transition duration-200 w-[80%]`}
                >
                    {loading ? "Enrolling..." : isEnrolled ? " Enrolled" : "Enroll Now"}
                </button>
            </div>
        </div>
    );
}
