import { useForm } from "react-hook-form";

type FormData = {
    name: string;
    email: string;
    message: string;
};

export function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {

        const formData = { ...data, access_key: "e7a2ab57-fdb8-4f96-ad27-00a99f71cef6" };

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            }).then(res => res.json());

            if (res.success) {
                alert(res.message);
                reset(); // clear the form
            } else {
                alert("Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while sending the message.");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 drop-shadow-md">
                    Contact Us
                </h2>
            </div>

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
                    {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                    <span className="text-red-600 text-sm">{errors.message.message}</span>
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
