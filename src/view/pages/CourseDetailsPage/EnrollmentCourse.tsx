
import type { EnrollmentsCollectionData } from "../../../model/EnrollmentCollectionData";
import type { CourseData } from "../../../model/CourseData";
import {useState} from "react";

type EnrollmentCourseProps = {
    enrollment: EnrollmentsCollectionData;
    courses: CourseData[];
};
const images: Record<string, string> = import.meta.glob(
    '../../../assets/course/*',
    { eager: true, import: 'default' }
);

export function EnrollmentCourse({ enrollment, courses }: EnrollmentCourseProps) {
    const course = courses.find(c => c.id === enrollment.courseId);
    const enrollmentStatus = enrollment.status
    const [showDetails, setShowDetails] = useState(false);

    if (!course) {
        return <div className="text-red-500">Course not found</div>;
    }

    const imagePath = `../../../assets/course/${course.image}`;
    const image = images[imagePath] ?? "/default-course.png";

    return (
        <div
            className="w-[16rem] m-3 flex flex-col justify-between
               shadow-lg rounded-xl border border-blue-300
               hover:shadow-2xl hover:bg-blue-50 transition duration-300 ease-in-out"
        >
            {/* Image */}
            <div className="flex justify-center p-3">
                <img
                    className="h-[7rem] w-[12rem] object-cover rounded-md hover:scale-105 transition duration-300"
                    src={image}
                    alt={course.name}
                />
            </div>

            {/* Details */}
            <div className="flex flex-col items-center p-2 text-center">
                <h3 className="text-[#1f3c88] text-lg font-semibold">
                    {course.name}
                </h3>
                <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                    {course.description}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Status:</span> {enrollmentStatus}
                </p>

                {/* Toggle Button */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-2 text-blue-700 text-sm font-medium hover:underline focus:outline-none"
                >
                    {showDetails ? "Hide Details" : "View Details"}
                </button>

                {/* Collapsible Section */}
                {showDetails && (
                    <div className="text-xs bg-blue-100 mt-3 p-3 rounded-lg w-full shadow-inner">
                        <p className="text-gray-800">
                            <span className="font-semibold">Start Date:</span> {course.course_start_date}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-semibold">End Date:</span> {course.course_end_date}
                        </p>
                        <p className="mt-2 font-semibold text-yellow-700">
                            Price:&nbsp;
                            <span>{course.currency}</span>&nbsp;
                            <span>{course.price}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>

    );
}
