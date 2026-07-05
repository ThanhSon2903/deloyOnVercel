import { useState } from "react";
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';

function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async(e) => {
        e.preventDefault();
        try {

            //Gọi API đăng nhập đến Spring Boot Backend
            const res = await axios.post(
                "http://localhost:8080/api/users/login",
                {
                    email,
                    password
                }
            )
            const token = res.data.data.accessToken;
            // const refreshToken = res.data.data.refreshToken;
            localStorage.setItem("token",token);
            // localStorage.setItem("RefreshToken",refreshToken);
            console.log("Token hien tai " + token);

            
            alert("Dang nhap thanh cong");
            navigate("/");
        } catch (error) {
            alert("Tên email hoặc mật khẩu không đúng");
        }
    }

    return(
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    width: "350px",
                    padding: "30px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >
                <h2>AI Posture Tracking</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "10px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "10px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                >
                    Login
                </button>

                <p>
                    Chưa có tài khoản?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Login;