import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEnrollmentsByUserId} from "../../../slices/courseEnrollmentSlice";
import {getAllCourses} from "../../../slices/courseSlice";
import {EnrollmentCourse} from "./EnrollmentCourse";
import type {AppDispatch, RootState} from "../../../store/store";

export function EnrollmentCoursePage() {
    const dispatch = useDispatch<AppDispatch>();

    const enrollments = useSelector((state: RootState) => state.enrollmentCollection.list);
    const courses = useSelector((state: RootState) => state.course.list);
    const loading = useSelector(
        (state: RootState) => state.enrollmentCollection.loading
    );

    useEffect(() => {
        const userIdStr = localStorage.getItem('userId');

        if (userIdStr) {
            const userId = parseInt(userIdStr);
            if (!isNaN(userId)) {
                dispatch(getEnrollmentsByUserId(userId));
            } else {
                console.warn("Invalid userId in localStorage");
            }
        } else {
            console.warn("No userId in localStorage");
        }

        dispatch(getAllCourses());
    }, [dispatch]);


    if (loading) return <div className="text-center text-lg">Loading...</div>;

    return (
        <section className="py-12 px-6 min-h-screen">
            <div className="relative text-center mb-10">
                <h2 className="text-4xl font-extrabold text-blue-900 drop-shadow-md inline-block relative">
                    Your Enrollments
                </h2>
                <div className="absolute left-0 right-0 h-0.25 opacity-40 bg-black mt-4 mb-6 top-full mx-auto w-full rounded-full"></div>
            </div>

            {enrollments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {enrollments.map((enrollment) => (
                        <EnrollmentCourse
                            key={enrollment.enrollmentId}
                            enrollment={enrollment}
                            courses={courses}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-10">
                    You haven't enrolled in any courses yet.
                </p>
            )}
        </section>

    );
}

