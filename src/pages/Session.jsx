import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Session() {
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "startTime", direction: "desc" });

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
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSessions(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    }

    const processedSessions = [...sessions]
        .filter((item) =>
            item.sessionId.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((item) => {
            if (!filterDate) return true;
            const sessionDate = item.startTime.split("T")[0];
            return sessionDate === filterDate;
        })
        .sort((a, b) => {
            if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
            const dateA = new Date(a[sortConfig.key]).getTime();
            const dateB = new Date(b[sortConfig.key]).getTime();
            return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        });

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return " ↕";
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    return (
        <div className="min-h-screen bg-[#0b0f19] p-4 md:p-6 font-sans text-slate-300">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Quản lý lịch sử phiên giám sát
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Xem và quản lý các dữ liệu phiên theo dõi tư thế ngồi của người dùng.
                        </p>
                    </div>

                    <div className="bg-[#111827] border border-slate-800 rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
                        <div className="text-sm font-medium text-slate-400">
                            Tổng số phiên:
                        </div>
                        <div className="text-xl font-bold text-teal-400">
                            {sessions.length}
                        </div>
                    </div>
                </div>

                {/* Thanh công cụ tìm kiếm và lọc */}
                <div className="mb-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#111827] p-4 border border-slate-800 rounded-xl shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo mã ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="w-full sm:w-44 bg-[#0b0f19] border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                                style={{ colorScheme: 'dark' }}
                            />
                            {filterDate && (
                                <button
                                    onClick={() => setFilterDate("")}
                                    className="text-xs text-rose-400 hover:text-rose-300 font-medium whitespace-nowrap px-2 py-1 transition-colors"
                                >
                                    Xóa lọc ngày
                                </button>
                            )}
                        </div>
                    </div>

                    {(searchTerm || filterDate) && (
                        <div className="text-xs text-slate-400">
                            Kết quả lọc: <span className="text-teal-400 font-semibold">{processedSessions.length}</span> phiên.
                        </div>
                    )}
                </div>

                {/* Danh sách dữ liệu dạng Bảng */}
                <div className="bg-[#111827] rounded-xl border border-slate-800 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-300">
                            <thead className="bg-[#0f172a] border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <tr>
                                    <th className="px-6 py-3 w-24">Mã ID</th>
                                    <th
                                        className="px-6 py-3 cursor-pointer hover:bg-slate-800/60 hover:text-white select-none transition-colors"
                                        onClick={() => handleSort("startTime")}
                                    >
                                        Thời gian bắt đầu{getSortIcon("startTime")}
                                    </th>
                                    <th
                                        className="px-6 py-3 cursor-pointer hover:bg-slate-800/60 hover:text-white select-none transition-colors"
                                        onClick={() => handleSort("endTime")}
                                    >
                                        Thời gian kết thúc{getSortIcon("endTime")}
                                    </th>
                                    <th className="px-6 py-3 text-center">Thời lượng</th>
                                    <th className="px-6 py-3 text-center">Thời gian sai tư thế</th>
                                    <th className="px-6 py-3 text-center w-32">Thao tác</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800">
                                {processedSessions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-10 text-center text-slate-500">
                                            Không tìm thấy dữ liệu phiên giám sát phù hợp.
                                        </td>
                                    </tr>
                                ) : (
                                    processedSessions.map((item) => (
                                        <tr key={item.sessionId} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-3 font-medium text-white">
                                                {item.sessionId}
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-slate-400">
                                                {formatDate(item.startTime)}
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-slate-400">
                                                {formatDate(item.endTime)}
                                            </td>
                                            <td className="px-6 py-3 text-center whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                                    {formatDuration(item.duration)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-center whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                                    item.badPostureDuration > 0
                                                        ? 'bg-rose-950/40 text-rose-400 border border-rose-900/40'
                                                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                                                }`}>
                                                    {item.badPostureDuration} phút
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <button className="inline-flex items-center justify-center font-medium text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3 py-1.5 rounded-md shadow-sm transition-colors whitespace-nowrap">
                                                    Chi tiết
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