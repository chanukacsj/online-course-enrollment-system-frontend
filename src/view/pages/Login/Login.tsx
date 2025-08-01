import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backendApi } from "../../../api.ts";
import { getUserFromToken } from "../../../auth/auth.ts";
import type { UserData } from "../../../model/UserData.ts";

type FormData = {
    email: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();

    const authenticateUser = async (data: FormData) => {
        try {
            const userCredentials = {
                email: data.email,
                password: data.password
            };
            console.log(userCredentials);
            const response = await backendApi.post('api/auth/login', userCredentials);
            console.log("down")
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            console.log(accessToken)
            const id = response.data.id;

            localStorage.setItem('userId', id);
            console.log(id);
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            const user: UserData = getUserFromToken(accessToken);
            localStorage.setItem('username', user.username as string);
            localStorage.setItem('role', user.role as string);

            alert("Successfully logged in!");
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8 border border-blue-200">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 mb-4 text-sm">
                    Sign in to access your courses
                </p>
                <div className="text-center mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                        ← Go Back
                    </button>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(authenticateUser)}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-blue-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="mt-2 block w-full border border-blue-200 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-2"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-2 block w-full border border-blue-200 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-2"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}
