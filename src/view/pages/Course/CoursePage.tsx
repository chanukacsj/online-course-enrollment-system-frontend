import {Course} from "./Course.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {useEffect, useState} from "react";
import {getAllCourses} from "../../../slices/courseSlice.ts";
import {getAllUsers} from "../../../slices/usersSlice.ts";

export function CoursePage() {
    const dispatch = useDispatch<AppDispatch>();
    const {list} = useSelector((state: RootState) => state.course);
    const {list: allUsers} = useSelector((state: RootState) => state.users);

    const [searchTerm, setSearchTerm] = useState("");


    const filteredCourses = list.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );


    useEffect(() => {
        dispatch(getAllCourses());
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
    }, [allUsers]);


    return (
        <>
            <section className="py-12 px-6  min-h-screen">
                <div className="relative text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-blue-900 drop-shadow-md inline-block relative">
                        Explore Our Courses
                    </h2>
                    <div
                        className="absolute left-0 right-0 h-0.25 opacity-40 bg-black mt-4 mb-6 top-full mx-auto w-full rounded-full"></div>
                </div>
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Search courses by name or description"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/*{list.length > 0 ? (*/}
                {/*    <div*/}
                {/*        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">*/}
                {/*        {list.map((course) => (*/}
                {/*            <Course key={course.id} data={course}/>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {filteredCourses.length > 0 ? (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {filteredCourses.map((course) => (
                            <Course key={course.id} data={course}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg mt-10">
                        No courses available at the moment.
                    </p>
                )}
            </section>
        </>
    );
}