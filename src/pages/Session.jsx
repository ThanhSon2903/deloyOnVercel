import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Session() {
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "startTime", direction: "desc" });

    // State lưu dữ liệu chi tiết của một Session lấy từ API View Detail
    const [selectedSession, setSelectedSession] = useState(null);
    // State quản lý trạng thái đang tải dữ liệu chi tiết
    const [loadingDetail, setLoadingDetail] = useState(false);
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

    const handleViewDetail = async (sessionId) => {
        setLoadingDetail(true);
        setSelectedSession(null);
        try {
            const token = localStorage.getItem("token");
            const res = await axiosClient.get(
                `http://localhost:8080/api/sessions/view-detail/${sessionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Dữ liệu trả về khớp với cấu trúc ViewDetailSessionResponse của Backend
            setSelectedSession(res.data.data); 
        } catch (error) {
            console.log("Error fetching session detail:", error);
            alert("Không thể tải dữ liệu chi tiết của session này.");
        } finally {
            setLoadingDetail(false);
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
        <div className="min-h-screen bg-slate-950 p-4 md:p-8 font-sans antialiased text-slate-200">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span>📋</span> Tracking session history
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                            Review and manage your posture monitoring sessions
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

                {/* Thanh Công Cụ: Tìm kiếm & Lọc theo ngày */}
                <div className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="🔍 Tìm kiếm theo số ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div className="relative w-full sm:w-48">
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            {filterDate && (
                                <button 
                                    onClick={() => setFilterDate("")}
                                    className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {(searchTerm || filterDate) && (
                        <div className="text-xs text-slate-400 self-start md:self-center">
                            Tìm thấy <span className="text-blue-400 font-bold">{processedSessions.length}</span> kết quả phù hợp.
                        </div>
                    )}
                </div>

                {/* Main Table Card */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-300">
                            <thead className="bg-slate-950/60 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <tr>
                                    <th className="px-6 py-4 w-20">🆔 ID</th>
                                    <th className="px-6 py-4 cursor-pointer hover:text-white select-none transition-colors" onClick={() => handleSort("startTime")}>
                                        🕒 Start Time <span className="ml-1 text-[10px]">{getSortIcon("startTime")}</span>
                                    </th>
                                    <th className="px-6 py-4 cursor-pointer hover:text-white select-none transition-colors" onClick={() => handleSort("endTime")}>
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
                                        <tr key={item.sessionId} className={`hover:bg-slate-800/40 transition-colors ${selectedSession?.sessionId === item.sessionId ? 'bg-blue-950/20 border-l-2 border-l-blue-500' : ''}`}>
                                            <td className="px-6 py-4 font-semibold text-blue-400">#{item.sessionId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.startTime)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.endTime)}</td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
                                                    {formatDuration(item.duration)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${item.badPostureDuration > 0 ? 'bg-red-950/60 text-red-400 border-red-900/40' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'}`}>
                                                    {item.badPostureDuration}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button 
                                                    onClick={() => handleViewDetail(item.sessionId)}
                                                    className="inline-flex items-center justify-center font-medium text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20 whitespace-nowrap"
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

                {/* HIỆU ỨNG LOADING KHI ĐANG ĐỢI API CHI TIẾT */}
                {loadingDetail && (
                    <div className="flex items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-2xl">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                        <p className="text-sm text-slate-400">Đang tải thông tin chi tiết và danh sách tư thế...</p>
                    </div>
                )}

                {/* KHU VỰC CHI TIẾT PHIÊN THEO YÊU CẦU */}
                {selectedSession && !loadingDetail && (
                    <div className="bg-slate-900 rounded-2xl border border-blue-900/40 shadow-2xl p-6 mt-8 animate-fadeIn transition-all">
                        
                        {/* Tiêu đề vùng chi tiết */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                            <div>
                                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>🤖</span> Session Tracking Details
                                </h4>
                                <p className="text-xs text-slate-400 mt-1">
                                    Chi tiết dữ liệu tổng hợp và lịch sử các tư thế đã phân tích
                                </p>
                            </div>
                            <button 
                                onClick={() => setSelectedSession(null)}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 text-xs rounded-xl transition-colors border border-slate-700"
                            >
                                ✕ Đóng chi tiết
                            </button>
                        </div>

                        {/* PHẦN THÔNG TIN TỔNG QUAN PHIÊN (Nằm bên trên bảng tư thế) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Session ID</p>
                                <p className="text-lg font-bold text-blue-400 mt-1">#{selectedSession.sessionId}</p>
                            </div>
                            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Time</p>
                                <p className="text-sm font-medium text-slate-200 mt-1.5">{formatDate(selectedSession.startTime)}</p>
                            </div>
                            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End Time</p>
                                <p className="text-sm font-medium text-slate-200 mt-1.5">{formatDate(selectedSession.endTime)}</p>
                            </div>
                            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</p>
                                <p className="text-sm font-bold text-emerald-400 mt-1.5">{formatDuration(selectedSession.duration)}</p>
                            </div>
                            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bad Posture Count</p>
                                <p className={`text-sm font-bold mt-1.5 ${selectedSession.badPostureDuration > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                                    {selectedSession.badPostureDuration} lần
                                </p>
                            </div>
                        </div>

                        {/* TIÊU ĐỀ BẢNG TƯ THẾ */}
                        <div className="mb-3">
                            <h5 className="text-sm font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                                <span>📋</span> Danh sách các tư thế đã detect được
                            </h5>
                        </div>

                        {/* BẢNG TƯ THẾ ĐÃ DETECT */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm text-slate-300">
                                <thead className="bg-slate-950/40 text-xs font-semibold uppercase text-slate-400">
                                    <tr>
                                        <th className="px-4 py-3 w-16 text-center">STT</th>
                                        <th className="px-4 py-3">🕒 Thời Gian Ghi Nhận</th>
                                        <th className="px-4 py-3">🧍 Tên Tư Thế / Trạng Thái</th>
                                        <th className="px-4 py-3 text-center">📐 Góc Nghiêng</th>
                                        <th className="px-4 py-3">📝 Ghi Chú</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {selectedSession.postureResponses && selectedSession.postureResponses.length > 0 ? (
                                        selectedSession.postureResponses.map((posture, index) => (
                                            <tr key={posture.postureId || index} className="hover:bg-slate-800/20 transition-colors">
                                                <td className="px-4 py-3 text-center font-medium text-slate-500">{index + 1}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-xs">
                                                    {formatDate(posture.detectTime || posture.timestamp)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                        posture.isBad 
                                                            ? 'bg-red-950 text-red-400 border border-red-900/30' 
                                                            : 'bg-emerald-950 text-emerald-400 border border-emerald-900/30'
                                                    }`}>
                                                        {posture.postureName || (posture.isBad ? "Sai Tư Thế ⚠️" : "Đúng Tư Thế ✅")}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center font-mono text-orange-400">
                                                    {posture.angle !== undefined && posture.angle !== null ? `${posture.angle}°` : "-"}
                                                </td>
                                                <td className="px-4 py-3 text-xs text-slate-400">
                                                    {posture.note || (posture.isBad ? "Tư thế không chuẩn" : "Tư thế tốt")}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                                                Không có dữ liệu tư thế chi tiết nào được ghi nhận trong phiên này.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Session;