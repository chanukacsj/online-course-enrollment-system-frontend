// import type { CourseData } from "../../../../model/CourseData.ts";
// import { useState } from "react";
//
//
// type AdminCoursesProps = {
//     courses: CourseData;
//     onUpdate: (course: CourseData) => void;
//     onDelete: (courseId: number) => void;
//     onCreate: (course: CourseData) => void;
// }
//
// export function AdminCourses({ courses, onUpdate, onDelete }: AdminCoursesProps) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState<CourseData>(courses);
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = () => {
//         onUpdate(formData);
//         setIsEditing(false);
//     };
//
//     return (
//         <div className="border p-4 rounded shadow mb-4 bg-white">
//             {isEditing ? (
//                 <div>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full p-2 mb-2 border border-gray-300 rounded"
//                         placeholder="Course Name"
//                     />
//                     <input
//                         type="text"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="w-full p-2 mb-2 border border-gray-300 rounded"
//                         placeholder="Course Description"
//                     />
//                     <input
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         className="w-full p-2 mb-2 border border-gray-300 rounded"
//                         placeholder="Price"
//                     />
//                     <input
//                         type="text"
//                         name="currency"
//                         value={formData.currency}
//                         onChange={handleChange}
//                         className="w-full p-2 mb-4 border border-gray-300 rounded"
//                         placeholder="Currency"
//                     />
//
//                     <div className="flex justify-end space-x-2">
//                         <button
//                             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                             onClick={() => setIsEditing(false)}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             onClick={handleSubmit}
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h3 className="text-lg font-semibold">{courses.name}</h3>
//                         <p className="text-gray-600">{courses.description}</p>
//                         <p className="text-gray-800 font-medium">
//                             {courses.price} {courses.currency}
//                         </p>
//                     </div>
//                     <div className="flex space-x-2">
//                         <button
//                             className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
//                             onClick={() => setIsEditing(true)}
//                         >
//                             Edit
//                         </button>
//                         <button
//                             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                             onClick={() => onDelete(courses.id)}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
