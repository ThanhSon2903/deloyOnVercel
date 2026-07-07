import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Session(){
    const [session,setSession] = useState([]);
    useEffect(() => {
        fetchFunction();
    },[]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString("vi-VN",{
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }
    const fetchFunction = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get(
                "http://localhost:8080/api/sessions/list-sessions",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSession(res.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="p-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">

                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        📋 Session History
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Review and manage your posture monitoring sessions.
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="bg-blue-50 text-gray-700 uppercase text-sm">
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Start</th>
                                <th className="px-6 py-4 text-left">End</th>
                                <th className="px-6 py-4 text-left">Duration</th>
                                <th className="px-6 py-4 text-left">Bad Posture</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {sessions.map((item, index) => (

                                <tr
                                    key={item.sessionId}
                                    className={`
                                        transition
                                        duration-300
                                        hover:bg-blue-50
                                        hover:shadow-md
                                        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    `}
                                >

                                    <td className="px-6 py-5 font-semibold text-blue-600">
                                        #{item.sessionId}
                                    </td>

                                    <td className="px-6 py-5">
                                        {formatDate(item.startTime)}
                                    </td>

                                    <td className="px-6 py-5">
                                        {formatDate(item.endTime)}
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                            {item.duration}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                            {item.badPostureDuration}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5 text-center">

                                        <button
                                            className="
                                                bg-blue-600
                                                hover:bg-blue-700
                                                hover:scale-105
                                                transition
                                                duration-300
                                                text-white
                                                px-5
                                                py-2
                                                rounded-lg
                                                shadow-md
                                            "
                                        >
                                            View Details
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    )
}
export default Session;