import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const loginUser = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                user
            );

            const accessToken =
                response.data.accessToken;

            const refreshToken =
                response.data.refreshToken;

            if (!accessToken || !refreshToken) {

                alert("Login Failed");

                return;
            }

            localStorage.setItem(
                "token",
                accessToken
            );

            localStorage.setItem(
                "refreshToken",
                refreshToken
            );

            localStorage.setItem(
                "userEmail",
                user.email
            );

            alert("Login Successful");

            navigate("/dashboard", {
                replace: true
            });

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(
                    error.response.data ||
                    "Login Failed"
                );

            } else {

                alert(
                    "Unable to connect to server"
                );
            }
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>PolicyVault</h1>

                <p>
                    Welcome Back 👋
                </p>

                <form onSubmit={loginUser}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="login-options">

                        <label>

                            <input
                                type="checkbox"
                            />

                            Remember Me

                        </label>

                        <span className="forgot">
                            Forgot Password?
                        </span>

                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

                <div className="register-text">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;