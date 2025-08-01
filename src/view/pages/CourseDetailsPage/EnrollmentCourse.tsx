
import type { EnrollmentsCollectionData } from "../../../model/EnrollmentCollectionData";
import type { CourseData } from "../../../model/CourseData";

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

    if (!course) {
        return <div className="text-red-500">Course not found</div>;
    }

    const imagePath = `../../../assets/course/${course.image}`;
    const image = images[imagePath] ?? "/default-course.png";

    return (
        <div
            className="w-[16rem] h-[18rem] m-3 flex flex-col justify-between
                 shadow-lg rounded-lg border border-blue-300
                 hover:bg-blue-100 transition duration-300 ease-in-out"
        >
            <div className="flex justify-center p-3">
                <img
                    className="h-[7rem] w-[12rem] object-cover rounded-md"
                    src={image}
                    alt={course.name}
                />
            </div>
            <div className="flex flex-col items-center p-2 pb-8">
                <h3 className="text-[#1f3c88] text-[1rem] font-semibold text-center">
                    {course.name}
                </h3>
                <p className="text-gray-700 text-sm text-center mt-1">
                    {course.description}
                </p>
                <div className="bg-yellow-300 mt-3 px-3 py-1 rounded-lg">
                    <h3 className="text-[1.2rem] font-bold">
                        {course.price} <small>{course.currency}</small>
                    </h3>
                </div>
            </div>
        </div>
    );
}
