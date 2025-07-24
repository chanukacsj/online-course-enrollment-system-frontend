// import type {EnrollmentsCollectionData} from "../../../model/EnrollmentCollectionData.ts";
//
//
// type EnrollmentProps = {
//     data: EnrollmentsCollectionData;
// };
//
// const images: Record<string, string> = import.meta.glob(
//     '../../../assets/enrollment/*',
//     { eager: true, import: 'default' }
// );
//
// export function EnrollmentCourse({ data }: EnrollmentProps) {
//     console.log(`../../../assets/enrollment/${data.}`);
//
//     const image = images[`../../../assets/enrollment/${data.image}`];
//
//     return (
//         <div
//             className="w-[16rem] h-[18rem] m-3 flex flex-col justify-between
//                        shadow-lg rounded-lg border border-blue-300
//                        hover:bg-blue-100 transition duration-300 ease-in-out"
//         >
//             <div className="flex justify-center p-3">
//                 <img
//                     className="h-[7rem] w-[12rem] object-cover rounded-md"
//                     src={image}
//                     alt={data.name}
//                 />
//             </div>
//             <div className="flex flex-col items-center p-2 pb-8">
//                 <h3 className="text-[#1f3c88] text-[1rem] font-semibold text-center">
//                     {data.name}
//                 </h3>
//                 <p className="text-gray-700 text-sm text-center mt-1">
//                     {data.description}
//                 </p>
//                 <div className="bg-yellow-300 mt-3 px-3 py-1 rounded-lg">
//                     <h3 className="text-[1.2rem] font-bold">
//                         {data.price} <small>{data.currency}</small>
//                     </h3>
//                 </div>
//             </div>
//         </div>
//     );
// }