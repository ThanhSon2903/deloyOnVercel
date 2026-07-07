import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Session() {
    const [sessions, setSessions] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({key: "startTime",direction: "desc"})

    useEffect(() => {
        fetchFunction();
    }, []);

    
    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    
    const formatDuration = (duration) => {
        if (!duration) return "0 giây";
        return duration.replace(/([a-zA-ZÀ-ỹ]+)(\d+)/g, "$1 $2");
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
        } catch (error) {
            console.log(error);
        }
    }

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc"){
            direction = "desc";
        }
        setSortConfig({ key, direction });
    }

    const processedSessions = [...sessions]
        .filter((item) => 
            item.sessionId.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
            
            const dateA = new Date(a[sortConfig.key]).getTime();
            const dateB = new Date(b[sortConfig.key]).getTime();

            if (sortConfig.direction === "asc") {
                return dateA - dateB; // Tăng dần
            } else {
                return dateB - dateA; // Giảm dần
            }
        });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return "↕️";
        return sortConfig.direction === "asc" ? "🔼" : "🔽";
    };

    return (
        <div className="min-h-screen bg-slate-950 p-4 md:p-8 font-sans antialiased text-slate-200">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span>📋</span> Session History
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Review and manage your posture monitoring sessions.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 shadow-xl flex items-center gap-4">
                        <div className="p-3 bg-blue-950/60 text-blue-400 border border-blue-900/50 rounded-xl font-semibold">
                            📊 Total
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total Sessions</p>
                            <h2 className="text-2xl font-bold text-white">{sessions.length}</h2>
                        </div>
                    </div>
                </div>

                {/* Thanh Công Cụ: Tìm kiếm & Trạng thái lọc */}
                <div className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            placeholder="🔍 Tìm kiếm theo số ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    
                    {searchTerm && (
                        <div className="text-xs text-slate-400 self-start md:self-center">
                            Tìm thấy <span className="text-blue-400 font-bold">{processedSessions.length}</span> kết quả phù hợp.
                        </div>
                    )}
                </div>

                {/* Table Card */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-300">
                            <thead className="bg-slate-950/60 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <tr>
                                    <th className="px-6 py-4 w-20">🆔 ID</th>
                                    
                                    {/* Thêm chức năng click sắp xếp cho cột Start Time */}
                                    <th 
                                        className="px-6 py-4 cursor-pointer hover:text-white select-none transition-colors"
                                        onClick={() => handleSort("startTime")}
                                    >
                                        🕒 Start Time <span className="ml-1 text-[10px]">{getSortIcon("startTime")}</span>
                                    </th>
                                    
                                    {/* Thêm chức năng click sắp xếp cho cột End Time */}
                                    <th 
                                        className="px-6 py-4 cursor-pointer hover:text-white select-none transition-colors"
                                        onClick={() => handleSort("endTime")}
                                    >
                                        🏁 End Time <span className="ml-1 text-[10px]">{getSortIcon("endTime")}</span>
                                    </th>
                                    
                                    <th className="px-6 py-4 text-center">⏱ Duration</th>
                                    <th className="px-6 py-4 text-center">⚠️ Bad Posture</th>
                                    <th className="px-6 py-4 text-center w-32">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800">
                                {processedSessions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <span className="text-3xl">📂</span>
                                                <p>No session history found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                        
                                    processedSessions.map((item) => (
                                        <tr 
                                            key={item.sessionId} 
                                            className="hover:bg-slate-800/40 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-semibold text-blue-400">
                                                #{item.sessionId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(item.startTime)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {formatDate(item.endTime)}
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
                                                    {formatDuration(item.duration)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                                                    item.badPostureDuration > 0 
                                                        ? 'bg-red-950/60 text-red-400 border-red-900/40' 
                                                        : 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                                                }`}>
                                                    {item.badPostureDuration}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="inline-flex items-center justify-center font-medium text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20 whitespace-nowrap">
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
        </div>
    );
}

export default Session;