import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import uttBg from "../assets/giang-duong-utt.jpg";

function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://deloyonrailway-production.up.railway.app/api/users/register",
                { username, email, password }
            );
            localStorage.setItem("verifyEmail", email);
            alert(res.data.data);
            navigate("/verify-otp");
        } catch (error) {
            alert("Đăng ký thất bại");
            console.log(error);
        }
    };

    // Style ô input nền trắng mờ với viền xám nhẹ cho theme sáng
    const inputStyle = {
        width: "100%",
        padding: "12px 16px",
        marginBottom: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Ô nhập sáng rõ
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        color: "#222",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)", 
        WebkitBoxShadow: "0 0 0px 1000px rgba(255, 255, 255, 0.85) inset"
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${uttBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
                position: "relative"
            }}
        >
            {/* Form đăng ký nền màu rgba(255, 255, 255, 0.85) sáng rõ */}
            <form
                onSubmit={handleRegister}
                style={{
                    width: "400px",
                    padding: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.85)", // Nền trắng sáng mờ theo yêu cầu
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)", // Đổ bóng nhẹ nhàng
                    boxSizing: "border-box",
                    zIndex: 1
                }}
            >
                <h2 style={{ 
                    color: "#1a1a1a", 
                    margin: "0 0 8px 0", 
                    fontSize: "28px", 
                    fontWeight: "700",
                    textAlign: "center",
                    letterSpacing: "0.5px"
                }}>
                    Tạo Tài Khoản
                </h2>
                
                <p style={{ 
                    color: "#666666", 
                    fontSize: "14px", 
                    textAlign: "center", 
                    marginBottom: "32px",
                    marginTop: "0"
                }}>
                    Chào mừng bạn đến với UTT
                </p>

                <div>
                    <label style={{ color: "#333333", fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập họ và tên"
                        value={username}
                        autoComplete="off"
                        onChange={(e) => setUserName(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#ff6a00";
                            e.target.style.boxShadow = "0 0 0 3px rgba(255, 106, 0, 0.15)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <div>
                    <label style={{ color: "#333333", fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                        Địa chỉ Email
                    </label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        autoComplete="new-email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#ff6a00";
                            e.target.style.boxShadow = "0 0 0 3px rgba(255, 106, 0, 0.15)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <div>
                    <label style={{ color: "#333333", fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#ff6a00";
                            e.target.style.boxShadow = "0 0 0 3px rgba(255, 106, 0, 0.15)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#e0e0e0";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                {/* Nút màu cam UTT sang trọng */}
                <button
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        width: "100%",
                        padding: "13px",
                        background: isHovered 
                            ? "linear-gradient(135deg, #e65c00, #ff8c00)" 
                            : "linear-gradient(135deg, #ff6a00, #ff8c00)",
                        border: "none",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: isHovered ? "0 6px 20px rgba(255, 106, 0, 0.4)" : "0 4px 12px rgba(255, 106, 0, 0.25)",
                        marginTop: "10px"
                    }}
                >
                    Đăng ký
                </button>

                <p style={{ 
                    color: "#555555", 
                    fontSize: "14px", 
                    textAlign: "center", 
                    marginTop: "24px",
                    marginBottom: "0" 
                }}>
                    Đã có tài khoản?{" "}
                    <Link to="/login" style={{ 
                        color: "#ff6a00", 
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#e65c00"}
                    onMouseLeave={(e) => e.target.style.color = "#ff6a00"}
                    >
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
