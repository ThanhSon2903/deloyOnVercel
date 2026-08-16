import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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

    // Style chung cho các ô Input theo style mờ tối đan xen
    const inputStyle = {
        width: "100%",
        padding: "12px 16px",
        marginBottom: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Nền tối trong suốt
        border: "1px solid rgba(255, 255, 255, 0.15)", // Viền sáng nhẹ
        borderRadius: "10px",
        color: "#fff",
        fontSize: "14px",
        outline: "none",
        transition: "all 0.3s ease",
        boxSizing: "border-box"
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: 'url("https://media.utt.edu.vn/uploads/tai-lieu-tuyen-sinh/HN/Co%20so%20HN.jpghttps://www.google.com/search?q=utt+quang+c%E1%BA%A3nh&sca_esv=77e44e7688afd311&rlz=1C1GCEA_enVN1192VN1192&udm=2&biw=1366&bih=599&sxsrf=APpeQnuhnjQRD-0-Eie6IDZ4igmSUMk4HA%3A1786894321733&ei=8deBaqioLKLIvr0Ppe3piQQ&ved=0ahUKEwjo5LCKvKWWAxUipK8BHaV2OkEQ4dUDCBE&uact=5&oq=utt+quang+c%E1%BA%A3nh&gs_lp=Egtnd3Mtd2l6LWltZyIQdXR0IHF1YW5nIGPhuqNuaEjVHlDwBViEHnAEeACQAQGYAU-gAd8KqgECMTm4AQPIAQD4AQGYAg2gAr4HwgIFEAAYgATCAgQQABgewgIGEAAYCBgewgIHECMYyQIYJ8ICChAAGIAEGIoFGEPCAggQABiABBixA8ICCxAAGIAEGLEDGIMBwgIGEAAYBRgemAMAiAYBkgcCMTOgB9U7sgcCMTK4B7gHwgcGMC4yLjExyAc9gAgB&sclient=gws-wiz-img#sv=CAMSURoyKhBlLXIxemRrdk94bGlNV1hNMg5yMXpka3ZPeGxpTVdYTToOV2I1SUhqaVR0enFmQ00gBCoXCgFzEhBlLXIxemRrdk94bGlNV1hNGAEwARgHIOPIoYQFSggQARgBIAEoAQ")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
                position: "relative"
            }}
        >
            {/* Lớp phủ dải màu tối nhẹ nhàng */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(10, 15, 30, 0.45)", // Phủ lớp xanh đen nhẹ tăng độ tương phản
                backdropFilter: "blur(2px)"
            }}></div>

            {/* Form đăng ký phong cách Kính Mờ (Glassmorphism) */}
            <form
                onSubmit={handleRegister}
                style={{
                    width: "400px",
                    padding: "40px",
                    backgroundColor: "rgba(20, 20, 25, 0.65)", // Nền kính mờ
                    backdropFilter: "blur(16px)", // Hiệu ứng làm mờ nền phía sau
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "20px",
                    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                    zIndex: 1
                }}
            >
                <h2 style={{ 
                    color: "#ffffff", 
                    margin: "0 0 8px 0", 
                    fontSize: "28px", 
                    fontWeight: "700",
                    textAlign: "center",
                    letterSpacing: "0.5px"
                }}>
                    Tạo Tài Khoản
                </h2>
                
                <p style={{ 
                    color: "rgba(255, 255, 255, 0.7)", 
                    fontSize: "14px", 
                    textAlign: "center", 
                    marginBottom: "32px",
                    marginTop: "0"
                }}>
                    Chào mừng bạn đến với hệ thống UTT
                </p>

                <div>
                    <label style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>
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
                            e.target.style.borderColor = "#ff7e29"; // Viền màu cam UTT khi focus
                            e.target.style.boxShadow = "0 0 8px rgba(255, 126, 41, 0.4)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <div>
                    <label style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>
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
                            e.target.style.borderColor = "#ff7e29";
                            e.target.style.boxShadow = "0 0 8px rgba(255, 126, 41, 0.4)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <div>
                    <label style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>
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
                            e.target.style.borderColor = "#ff7e29";
                            e.target.style.boxShadow = "0 0 8px rgba(255, 126, 41, 0.4)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                {/* Nút Đăng ký với màu Cam Gradient nổi bật hài hòa với màu trường UTT */}
                <button
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        width: "100%",
                        padding: "13px",
                        background: isHovered 
                            ? "linear-gradient(135deg, #e65c00, #f9d423)" 
                            : "linear-gradient(135deg, #ff6a00, #ee0979)", // Gradient Cam - Hồng Dâu hiện đại
                        border: "none",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: isHovered ? "0 6px 20px rgba(255, 106, 0, 0.5)" : "0 4px 15px rgba(255, 106, 0, 0.3)",
                        marginTop: "10px"
                    }}
                >
                    Đăng ký
                </button>

                <p style={{ 
                    color: "rgba(255, 255, 255, 0.7)", 
                    fontSize: "14px", 
                    textAlign: "center", 
                    marginTop: "24px",
                    marginBottom: "0" 
                }}>
                    Đã có tài khoản?{" "}
                    <Link to="/login" style={{ 
                        color: "#ff9d5c", 
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                    onMouseLeave={(e) => e.target.style.color = "#ff9d5c"}
                    >
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;