import { useForm } from "react-hook-form";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendApi } from "../../../api.ts";
import type { AppDispatch } from "../../../store/store.ts";
import { useDispatch } from "react-redux";

export function Contact() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    type FormData = {
        name: string;
        email: string;
        message: string;
    };

    const onSubmit = (data: FormData) => {
        console.log(data);
        dispatch(saveContact(data))
            .unwrap()
            .then((res) => {
                alert("Contact message sent successfully.");
                console.log(res);
            })
            .catch((err) => {
                alert("Failed to send message.");
                console.error(err);
            });
    };

    const saveContact = createAsyncThunk(
        "contact/saveContact",
        async (data: FormData) => {
            const response = await backendApi.post("api/contacts/save", data);
            console.log(response);
            return response.data;
        }
    );

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Title */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 drop-shadow-md">
                    Contact Us
                </h2>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-md border border-blue-200 hover:bg-blue-50 transition duration-300 ease-in-out"
            >
                {/* Name */}
                <label htmlFor="name" className="font-semibold block mb-1">
                    Name:
                </label>
                <input
                    id="name"
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                    {...register("name", {
                        required: "Name is required",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Name must contain only letters and spaces",
                        },
                    })}
                />
                {errors.name && (
                    <span className="text-red-600 text-sm">{errors.name.message}</span>
                )}

                {/* Email */}
                <label htmlFor="email" className="font-semibold block mt-4 mb-1">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-red-600 text-sm">{errors.email.message}</span>
                )}

                {/* Message */}
                <label htmlFor="message" className="font-semibold block mt-4 mb-1">
                    Message:
                </label>
                <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="text-red-600 text-sm">Message is required</span>
                )}

                {/* Button */}
                <button
                    type="submit"
                    className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded-lg shadow-md transition-colors duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
