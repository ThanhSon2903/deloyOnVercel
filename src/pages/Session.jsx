import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Session(){
    const [sessions,setSessions] = useState([]);
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
            setSessions(res.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

            <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                <h1 className="text-4xl font-bold text-gray-800">
                    📋 Session History
                </h1>

                <p className="text-gray-500 mt-2">
                    Review and manage your posture monitoring sessions.
                </p>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-8 py-5 shadow-xl">
                <p className="text-sm opacity-90">
                    Total Sessions
                </p>

                <h2 className="text-4xl font-bold">
                    {sessions.length}
                </h2>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                <table className="w-full">

                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                    <tr>

                    <th className="px-6 py-4 text-left">🆔 ID</th>

                    <th className="px-6 py-4 text-left">🕒 Start</th>

                    <th className="px-6 py-4 text-left">🏁 End</th>

                    <th className="px-6 py-4 text-center">⏱ Duration</th>

                    <th className="px-6 py-4 text-center">⚠ Bad Posture</th>

                    <th className="px-6 py-4 text-center">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {sessions.length === 0 ? (

                    <tr>

                        <td
                        colSpan={6}
                        className="py-16 text-center text-gray-400 text-lg"
                        >
                        📂 No session history found.
                        </td>

                    </tr>

                    ) : (

                    sessions.map((item, index) => (

                        <tr
                        key={item.sessionId}
                        className={`
                            border-b
                            transition-all
                            duration-300
                            hover:bg-blue-50
                            hover:scale-[1.005]
                            ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        `}
                        >

                        <td className="px-6 py-5 font-bold text-blue-600">
                            #{item.sessionId}
                        </td>

                        <td className="px-6 py-5 text-gray-700">
                            {formatDate(item.startTime)}
                        </td>

                        <td className="px-6 py-5 text-gray-700">
                            {formatDate(item.endTime)}
                        </td>

                        <td className="px-6 py-5 text-center">

                            <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold">
                            {item.duration}
                            </span>

                        </td>

                        <td className="px-6 py-5 text-center">

                            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                            {item.badPostureDuration}
                            </span>

                        </td>

                        <td className="px-6 py-5 text-center">

                            <button
                            className="
                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600
                                hover:from-blue-700
                                hover:to-indigo-700
                                text-white
                                px-5
                                py-2.5
                                rounded-xl
                                shadow-lg
                                transition-all
                                duration-300
                                hover:scale-105
                            "
                            >
                            👁 View Details
                            </button>

                        </td>

                        </tr>

                    ))

                    )}

                </tbody>

                </table>

            </div>

            </div>

        </div>
    );
}
export default Session;