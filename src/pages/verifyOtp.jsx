import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";function VerifyOtp() {

    const [email, setEmail] = useState(
        localStorage.getItem("verifyEmail") || ""
    );

    const [otp, setOtp] = useState("");

    const navigate = useNavigate();

    const handleVerify = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/users/verify-otp",
                {
                    email,
                    otp
                }
            );

            alert("Xác thực thành công");

            localStorage.removeItem("verifyEmail");

            navigate("/login");

        } catch (error) {

            alert("OTP không hợp lệ");

            console.log(error);

        }
    };

    const handleResendOtp = async () => {

    try {

        await axios.post(
            `http://localhost:8080/api/users/resent-otp/${email}`
        );

        alert("Đã gửi lại OTP");

    } catch (error) {

        alert("Gửi OTP thất bại");

    }
};
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <form
                onSubmit={handleVerify}
                style={{
                    width: "350px",
                    padding: "30px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >
                <h2>Email Verification</h2>

                <input
                    type="email"
                    value={email}
                    disabled
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <button
                    type="submit"
                >
                    Verify OTP
                </button><br />
                <button
                    type="button"
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>

            </form>
        </div>
    );
}

export default VerifyOtp;