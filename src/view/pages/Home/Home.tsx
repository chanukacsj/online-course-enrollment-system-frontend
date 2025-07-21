import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllCourses} from "../../../slices/courseSlice.ts";
import {Course} from "../../common/Course/Course.tsx";

export function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const {list} = useSelector((state:RootState)=>state.course)


    useEffect(() => {
        dispatch(getAllCourses())

    }, []);

    return (
        <div>
            <div className="flex flex-wrap ml-[1px] mt-5 mb-5
                            justify-center items-center mx-auto">
                {
                    list.map((course) => (
                        <Course key={course.id} data={course}/>
                    ))
                }
            </div>
        </div>
    );
}