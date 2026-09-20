import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import api from "../../api/axiosConfig";


function Sidebar() {

    const navigate = useNavigate();


    // =========================
    // LOGOUT
    // =========================

    const logout = async () => {

        try {

            // Get refresh token
            const refreshToken =
                localStorage.getItem(
                    "refreshToken"
                );


            // Revoke refresh token from backend
            if (refreshToken) {

                await api.post(
                    "/api/auth/logout",
                    {
                        refreshToken: refreshToken
                    }
                );

            }

        } catch (error) {

            console.log(
                "Logout error:",
                error
            );

        } finally {

            // Remove access token
            localStorage.removeItem(
                "token"
            );


            // Remove refresh token
            localStorage.removeItem(
                "refreshToken"
            );


            // Remove user email
            localStorage.removeItem(
                "userEmail"
            );


            // Go to login page
            navigate("/login", {
                replace: true
            });

        }

    };


    return (

        <aside className="sidebar">


            {/* Logo */}

            <div className="sidebar-logo">

                <div className="logo-icon">
                    P
                </div>

                <div>

                    <h2>
                        PolicyVault
                    </h2>

                    <span>
                        Policy Manager
                    </span>

                </div>

            </div>


            {/* Navigation */}

            <nav className="sidebar-menu">


                <NavLink to="/dashboard">

                    <span>
                        ⌂
                    </span>

                    Dashboard

                </NavLink>


                <NavLink to="/policies">

                    <span>
                        ▤
                    </span>

                    My Policies

                </NavLink>


                <NavLink to="/add-policy">

                    <span>
                        ＋
                    </span>

                    Add Policy

                </NavLink>


                <NavLink to="/profile">

                    <span>
                        ♙
                    </span>

                    Profile

                </NavLink>


            </nav>


            {/* Logout */}

            <div className="sidebar-bottom">

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <span>
                        ↪
                    </span>

                    Logout

                </button>

            </div>


        </aside>

    );

}


export default Sidebar;