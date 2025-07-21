import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {backendApi} from "../../../api.ts";

type RegisterData = {
    username: string;
    email: string;
    password: string;
};

export function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();

    const registerUser = async (data: RegisterData) => {
        try {
            const response = await backendApi.post("api/auth/register", data);
            if (response.status === 201) {
                alert("Registration successful!");
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration failed", error);
            alert("Failed to register. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8 border border-blue-200">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-500 mb-4 text-sm">
                    Register to start learning
                </p>
                <form className="space-y-6" onSubmit={handleSubmit(registerUser)}>
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-blue-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username", { required: true })}
                            className="mt-2 block w-full border border-blue-200 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-2"
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">Username is required</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: true })}
                            className="mt-2 block w-full border border-blue-200 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-2"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        Register
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
                        >
                            Sign In
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
