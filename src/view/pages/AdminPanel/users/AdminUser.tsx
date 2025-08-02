import type { UserData } from "../../../../model/UserData.ts";
import { useState } from "react";

type AdminUserProps = {
    data: UserData;
    onUpdate: (user: UserData) => void;
    onDelete: (id: number) => void;
};

export function AdminUser({ data, onUpdate, onDelete }: AdminUserProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserData>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    return (
        <div className="border border-gray-300 p-4 rounded-md shadow-md mb-4 bg-white">
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="name"
                        value={formData.username}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="p-2 border rounded"
                        placeholder="Role"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="text-lg font-semibold text-blue-800">{data.username}</div>
                    <div className="text-sm text-gray-600">{data.email}</div>
                    <div className="text-sm font-medium">Role: {data.role}</div>
                    <div className="flex gap-3 mt-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(data.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
