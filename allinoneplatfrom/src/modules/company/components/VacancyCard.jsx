import { MoreVertical, Pencil, Trash2 } from "lucide-react";

export default function VacancyCard({
    status,
    title,
    department,
    time,
    applicants,
    action
}) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start">
                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {status}
                </span>
                <MoreVertical className="text-gray-400" />
            </div>

            <h4 className="font-bold text-lg mt-3">{title}</h4>
            <p className="text-gray-500 text-sm">
                {department} • {time}
            </p>

            <div className="flex justify-between items-center mt-5">
                <p className="text-sm text-gray-500">
                    Applicants <br />
                    <span className="text-blue-600 font-bold text-lg">
                        {applicants}
                    </span>
                </p>

                <div className="flex items-center gap-2">
                    <button className="p-2 bg-gray-100 rounded-lg">
                        <Pencil size={16} />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <Trash2 size={16} />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium">
                        {action}
                    </button>
                </div>
            </div>
        </div>
    );
}
