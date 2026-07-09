import { useState } from "react";
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';

function Register(){
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://deloyonrailway-production.up.railway.app/api/users/register",
                {
                    username,
                    email,
                    password
                }
            );
            localStorage.setItem(
                "verifyEmail",
                email
            );
            navigate("/verify-otp")
        }
        catch (error) {
            alert("Đăng ký thất bại");
            console.log(error);
        }
    }

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
                onSubmit={handleRegister}
                style={{
                    width: "350px",
                    padding: "30px",
                    border: "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >
                <h2>Register</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={username}
                    autoComplete="off"
                    onChange={(e) =>
                        setUserName(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    autoComplete="new-email"
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                >
                    Register
                </button>

                <p>
                    Đã có tài khoản?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>
        </div>
    );
    
}
export default Register;