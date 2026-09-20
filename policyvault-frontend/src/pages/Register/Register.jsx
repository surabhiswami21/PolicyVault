import "./Register.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                user
            );

            alert(response.data);

            if (
                response.data ===
                "Registration Successful"
            ) {

                navigate("/login");
            }

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(
                    error.response.data ||
                    "Registration Failed"
                );

            } else {

                alert(
                    "Unable to connect to server"
                );
            }
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <h1>PolicyVault</h1>

                <p>
                    Create your account
                </p>

                <form onSubmit={registerUser}>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={user.fullName}
                        onChange={handleChange}
                        required
                    />

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

                    <button type="submit">
                        Register
                    </button>

                </form>

                <div className="login-text">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;