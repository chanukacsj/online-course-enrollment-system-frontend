
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentsByUserId } from "../../../slices/courseEnrollmentSlice";
import { getAllCourses } from "../../../slices/courseSlice";
import { EnrollmentCourse } from "./EnrollmentCourse";
import type { AppDispatch, RootState } from "../../../store/store";

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
        <div className="flex flex-wrap justify-center p-4">
            {enrollments.map(enrollment => (
                <EnrollmentCourse
                    key={enrollment.id}
                    enrollment={enrollment}
                    courses={courses}
                />
            ))}
        </div>
    );
}
