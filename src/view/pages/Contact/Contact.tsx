import {useForm} from "react-hook-form";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {backendApi} from "../../../api.ts";
import type {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";

export function Contact() {

    const dispatch = useDispatch<AppDispatch>();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

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
        'contact/saveContact',
        async (data: FormData) => {
            const response = await backendApi.post('api/contacts/save', data)
            console.log(response)
            return response.data

        }
    )

    return (

        <div className="w-full h-screen flex justify-center items-center relative ">
            <div className="absolute top-13 text-center mb-10">
                <h2 className="text-4xl font-extrabold text-blue-900 drop-shadow-md inline-block ">
                    Contact Us
                </h2>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 shadow-lg rounded-lg border border-blue-300
                 hover:bg-blue-100 transition duration-300 ease-in-out"
            >
                <label htmlFor="name" className="font-semibold">Name:</label>
                <input
                    id="name"
                    type="text"
                    className="p-3 border border-gray-300 rounded text-base"
                    {...register("name", {
                        required: "Name is required",
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Name must contain only letters and spaces",
                        },
                    })}
                />
                {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}

                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                    id="email"
                    type="email"
                    className="p-3 border border-gray-300 rounded text-base"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Invalid email format",
                        },
                    })}
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}

                <label htmlFor="message" className="font-semibold">Message:</label>
                <textarea
                    id="message"
                    rows={4}
                    className="p-3 border border-gray-300 rounded text-base"
                    {...register("message", {required: true})}
                />
                {errors.message && <span className="text-red-600 text-sm">Message is required</span>}

                <button
                    type="submit"
                    className="p-3 bg-blue-600 hover:bg-blue-700 font-semibold text-white rounded transition-colors duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
}